import { prisma } from "../config/database.js";
import { EventTypeInput } from '../dtos/eventType.dto.js';

export async function createEventType(data: EventTypeInput) {
   const eventType = await prisma.eventType.create({ data });
   return eventType;
}

export async function getEventType(id: number) {
    const eventType = await prisma.eventType.findUnique({
        where: { id }
    });
    return eventType;
}

export async function getAllEventTypesByHost(hostId: number) {
    const eventTypes = await prisma.eventType.findMany({
        where: { hostId }
    });
    return eventTypes;
}

export async function updateEventType(id: number, data: Partial<EventTypeInput>) {
    const eventType = await prisma.eventType.update({
        where: { id },
        data
    });
    return eventType;
}

export async function deleteEventType(id: number) {
    const eventType = await prisma.eventType.delete({
        where: { id }
    });
    return eventType;
}