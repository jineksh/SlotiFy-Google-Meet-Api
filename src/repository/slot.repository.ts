import { prisma } from "../config/database.js";


export async function getSlotsByHostIdInRange(hostId: number, startDate: Date, endDate: Date) {
    const slots = await prisma.slot.findMany({
        where: {
            hostId,
            startTime: {
                gte: startDate,
                lte: endDate,
            },
            status: 'BOOKED', // Only fetch booked slots
        },
        
    });

    return slots;
}