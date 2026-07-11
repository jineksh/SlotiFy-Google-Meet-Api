import { prisma } from "../config/database.js";
import type {
    AvailabilityExceptionInput,
    AvailabilityExceptionUpdateInput,
} from "../dtos/availabilityException.dto.js";

export async function createAvailabilityException(data: AvailabilityExceptionInput) {
    // Prisma AvailabilityException model requires a relation to User via `userId`.
    // Request userId is injected by controller middleware, so it must be present here.
    const availabilityException = await prisma.availabilityException.create({
        data: {
            ...data,
            userId: (data as any).userId,
        },
    });
    return availabilityException;
}


export async function getAvailabilityExceptionById(id: number) {
    const availabilityException = await prisma.availabilityException.findUnique({
        where: { id },
    });
    return availabilityException;
}

export async function getAvailabilityExceptionsByUserId(userId: number) {
    const availabilityExceptions = await prisma.availabilityException.findMany({
        where: { userId },
        orderBy: { date: "asc" },
    });
    return availabilityExceptions;
}

export async function updateAvailabilityException(
    id: number,
    data: AvailabilityExceptionUpdateInput
) {
    const availabilityException = await prisma.availabilityException.update({
        where: { id },
        data,
    });
    return availabilityException;
}

export async function deleteAvailabilityException(id: number) {
    const response = await prisma.availabilityException.delete({
        where: { id },
    });
    return response;
}


export async function getAvailabilityExceptionsByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date
) {
    const availabilityExceptions = await prisma.availabilityException.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        orderBy: { date: "asc" },
    });
    return availabilityExceptions;
}
