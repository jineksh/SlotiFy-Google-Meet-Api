import { prisma } from "../config/database.js";
import { BookingInput } from "../dtos/booking.dto.js";
import { badRequest } from "../utils/errorHandler.js";

export async function createBookingWithSlotReservation(input: BookingInput) {
    return prisma.$transaction(async (tx: any) => {
        const slot = await tx.slot.findUnique({
            where: {
                id: input.slotId,
            },
        });

        if (!slot || slot.status !== "AVAILABLE") {
            throw badRequest("Slot is not available");
        }

        const updateSlot = await tx.slot.updateMany({
            where: {
                id: input.slotId,
                status: "AVAILABLE",
            },
            data: {
                status: "BOOKED",
            },
        });

        if (updateSlot.count === 0) {
            throw badRequest("Slot is not available");
        }

        const booking = await tx.booking.create({
            data: {
                eventTypeId: slot.eventTypeId,
                slotId: input.slotId,
                hostId: slot.userId,
                inviteeEmail: input.inviteeEmail,
                inviteeName: input.inviteeName,
                inviteeNotes: input.inviteeNotes,
                status: "CONFIRMED",
            },
            include: {
                slot: true,
            },
        });

        return booking;
    });
}
