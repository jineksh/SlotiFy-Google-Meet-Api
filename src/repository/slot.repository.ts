import { prisma } from "../config/database.js";

export async function getSlotsByHostIdInRange(userId: number, startDate: Date, endDate: Date) {
    const slots = await prisma.slot.findMany({
        where: {
            userId: userId,
            startTime: {
                gte: startDate,
                lte: endDate,
            },
            status: 'BOOKED', // Only fetch booked slots
        },
    });

    return slots;
}

export async function upsertSlotForGeneration(input: {
    userId: number;
    eventTypeId: number;
    startTime: Date;
    endTime: Date;
    status?: string;
}) {
    return prisma.slot.upsert({
        where: {
            eventTypeId_startTime_endTime: {
                eventTypeId: input.eventTypeId,
                startTime: input.startTime,
                endTime: input.endTime,
            },
        },
        create: {
            userId: input.userId,
            eventTypeId: input.eventTypeId,
            startTime: input.startTime,
            endTime: input.endTime,
            status: input.status ?? "AVAILABLE",
        },
        update: {
            status: input.status ?? "AVAILABLE",
        },
    });
}

export async function getSlotsByEventTypeInRange(eventTypeId: number, startDate: Date, endDate: Date) {
    return prisma.slot.findMany({
        where: {
            eventTypeId,
            startTime: {
                gte: startDate,
                lte: endDate,
            },
            status: { in: ["AVAILABLE", "BOOKED"] },
        },
    });
}

export async function updateSlotStatus(id: string, status: string) {
    return prisma.slot.update({
        where: { id },
        data: { status },
    });
}