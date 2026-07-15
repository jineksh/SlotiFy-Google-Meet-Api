import { BookingInput, ListHostBookingsQueryInput } from "../dtos/booking.dto.js";
import { createBookingWithSlotReservation, getHostBookings } from "../repository/booking.repository.js";

export async function createBookingOptimastic(input: BookingInput) {
    const booking = await createBookingWithSlotReservation(input);

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


