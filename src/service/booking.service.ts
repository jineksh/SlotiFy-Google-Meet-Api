import { BookingInput, createBookingSchema, ListHostBookingsQueryInput } from "../dtos/booking.dto.js";
import { createBookingWithSlotReservation, getHostBookings } from "../repository/booking.repository.js";
import {mailType} from '../utils/sendMail.js'
import {sendMailWorkflow} from '../temporal/client.js'
import {regenerateSlotsWorkflow} from '../temporal/client.js'

export async function createBookingOptimastic(input: BookingInput) {
    const booking = await createBookingWithSlotReservation(input);

    const mailObj : mailType = {
        inviteeEmail : booking.inviteeEmail,
        inviteeName : booking.inviteeName,
        date : booking.slot.startTime,
        time : booking.slot.startTime
    }

    await sendMailWorkflow(mailObj);
    await regenerateSlotsWorkflow({hostId : booking.slot.userId})



    return {
        id: booking.id,
        eventTypeId: booking.eventTypeId,
        slotId: booking.slotId,
        inviteeEmail: booking.inviteeEmail,
        inviteeNotes: booking.inviteeNotes,
        inviteeName: booking.inviteeName,
        meetLink: booking.meetLink,
        calendarEventId: booking.calendarEventId,
        slot: {
            id: booking.slot.id,
            startTime: booking.slot.startTime,
            endTime: booking.slot.endTime,
            status: booking.slot.status,
        },
    };
}

export async function listHostBookings(hostId: number, filters: ListHostBookingsQueryInput = {}) {
    const bookings = await getHostBookings(hostId, filters);

    return bookings.map((booking) => ({
        id: booking.id,
        eventTypeId: booking.eventTypeId,
        slotId: booking.slotId,
        inviteeEmail: booking.inviteeEmail,
        inviteeNotes: booking.inviteeNotes,
        inviteeName: booking.inviteeName,
        status: booking.status,
        meetLink: booking.meetLink,
        calendarEventId: booking.calendarEventId,
        createdAt: booking.createdAt,
        slot: {
            id: booking.slot.id,
            startTime: booking.slot.startTime,
            endTime: booking.slot.endTime,
            status: booking.slot.status,
        },
    }));
}


