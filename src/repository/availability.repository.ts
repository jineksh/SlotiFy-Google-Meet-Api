import { prisma } from "../config/database.js";
import type { AvailabilityInput, AvailabilityUpdateInput } from "../dtos/availability.dto.js";

export async function createAvailability(data: AvailabilityInput) {
    
    const availability = await prisma.availability.create({
        data: {
            ...data,
            userId: (data as any).userId,
        },
    });
    return availability;
}


export async function getAvailabilityById(id: number) {
    const availability = await prisma.availability.findUnique({
        where: { id },
    });
    return availability;
}

export async function getAvailabilitiesByUserId(userId: number) {
    const availabilities = await prisma.availability.findMany({
        where: { userId },
        orderBy: { weekday: "asc" },
    });
    return availabilities;
}

export async function updateAvailability(id: number, data: AvailabilityUpdateInput) {
    const availability = await prisma.availability.update({
        where: { id },
        data,
    });
    return availability;
}

export async function deleteAvailability(id: number) {
    const response = await prisma.availability.delete({
        where: { id },
    });
    return response;
}
