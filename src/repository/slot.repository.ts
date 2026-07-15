import { prisma } from "../config/database.js";


export async function getSlotsByHostIdInRange(userId: number, startDate: Date, endDate: Date) {
    const slots = await prisma.slot.findMany({
        where: {
            userId : userId,
            startTime: {
                gte: startDate,
                lte: endDate,
            },
            status: 'BOOKED', // Only fetch booked slots
        },
        
    });

    return slots;
}