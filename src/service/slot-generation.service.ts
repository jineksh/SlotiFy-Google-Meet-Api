import { DateTime } from "luxon";
import { getUserById } from '../repository/user.repository.js';
import { getAvailabilitiesByUserId } from '../repository/availability.repository.js';
import { getAvailabilityExceptionsByDateRange } from '../repository/availabilityException.repository.js'
import { getAllEventTypesByHost } from '../repository/eventType.repository.js'
import { getSlotsByHostIdInRange } from '../repository/slot.repository.js'
import { notFound } from "../utils/errorHandler.js";
import { applyExceptionForDate, overlapsBooked, TimeWindow } from "./slot.service.js";
import { windowsforWeekday } from './slot.service.js'
import { generateSlots } from './slot.service.js'
import { prisma } from "../config/database.js";
export interface generateSlotsInput {
    hostId: number,
    from?: string,
    to?: string
}


export async function regenerateSlots(input: generateSlotsInput) {


    const host = await getUserById(input.hostId);

    if (!host) {
        throw notFound('host not found');
    }


    const from = input.from ? DateTime.fromISO(input.from, { zone: 'utc' }).startOf('day') : DateTime.now().startOf('day');

    const to = input.to ? DateTime.fromISO(input.to, { zone: 'utc' }).endOf('day') : from.plus({ days: 30 }).endOf('day');



    // we have to fetch rules,bookedSlots,exceptions,eventTypes for generate slots



    const [rules, exceptions, eventTypes, bookedSlots] = await Promise.all([
        getAvailabilitiesByUserId(input.hostId),
        getAvailabilityExceptionsByDateRange(input.hostId, from.toJSDate(), to.toJSDate()),
        getAllEventTypesByHost(input.hostId),
        getSlotsByHostIdInRange(input.hostId, from.toJSDate(), to.toJSDate())
    ]);


    const bookedslots: TimeWindow[] = bookedSlots.map((slot) => {
        return {
            start: DateTime.fromJSDate(slot.startTime, { zone: 'utc' }),
            end: DateTime.fromJSDate(slot.endTime, { zone: 'utc' })
        }
    });

    for (const event of eventTypes) {


        const validKeys = new Set<string>();

        for (let cursor = from; cursor <= to; cursor = cursor.plus({ days: 1 })) {


            const cursorDate = cursor.toISODate();

            const dateExeceptions = exceptions.filter((ex) => DateTime.fromJSDate(ex.date, { zone: 'utc' }).toISODate() === cursorDate);

            const exceptionObj = dateExeceptions.map((ex) => {
                return {
                    type: ex.type,
                    startTime: ex.startTime,
                    endTime: ex.endTime,
                    timezone: ex.timezone
                }
            });


            let windows: TimeWindow[] = [];

            for (const rule of rules) {
                windows.push(...windowsforWeekday(cursor, rule.startTime, rule.endTime, rule.weekday, rule.timezone))
            }

            windows = applyExceptionForDate(windows, exceptionObj, cursor);

            const slots = generateSlots(event.bufferBeforeMinutes, event.bufferAfterMinutes, event.duration, windows).
                filter((slot) => !overlapsBooked(slot, bookedslots, event.bufferBeforeMinutes, event.bufferAfterMinutes));



            for (const slot of slots) {
                const slotStart = slot.start.toJSDate();
                const slotEnd = slot.end.toJSDate();

                const key = `${event.id}-${slotStart.toISOString()}-${slotEnd.toISOString()}`;

                validKeys.add(key);

                await prisma.slot.upsert({
                    where: {
                        eventTypeId_startTime_endTime: {
                            eventTypeId: event.id,
                            startTime: slotStart,
                            endTime: slotEnd,
                        },
                    },
                    create: {
                        userId: input.hostId,
                        eventTypeId: event.id,
                        startTime: slotStart,
                        endTime: slotEnd,
                        status: "AVAILABLE",
                    },
                    update: {
                        status: "AVAILABLE"
                    }

                })

            };




        }


        const allSlots = await prisma.slot.findMany({
            where: {
                eventTypeId: event.id,
                startTime: {
                    gte: from.toJSDate(),
                    lte: to.toJSDate()
                },
                status: { in: ["AVAILABLE", "BOOKED"] }

            }
        });


        for (const slot of allSlots) {

            const slotStart = slot.startTime.toISOString();
            const slotEnd = slot.endTime.toISOString();
            const eventId = slot.eventTypeId;

            const key = `${eventId}-${slotStart}-${slotEnd}`;

            if (!validKeys.has(key)) {
                await prisma.slot.update({
                    where: {
                        id: slot.id
                    },
                    data: {
                        status: "UNAVAILABLE"
                    }
                })
            }
        }



    }









}