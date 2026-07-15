import { EventTypeInput } from "../dtos/eventType.dto.js";
import {
    createEventType as createEventTypeRepository,
    getEventType as getEventTypeRepository,
    getAllEventTypesByHost as getAllEventTypesByHostRepository,
    updateEventType as updateEventTypeRepository,
    deleteEventType as deleteEventTypeRepository
} from '../repository/eventType.repository.js';
import { notFound, badRequest } from '../utils/errorHandler.js';
import {regenerateSlotsWorkflow} from '../temporal/client.js'

export async function createEventTypeService(data: EventTypeInput) {
    const eventType = await createEventTypeRepository(data);

    const workflowInput = {
        hostId: eventType.hostId,
    };


    await regenerateSlotsWorkflow(workflowInput);

    return eventType;
}

export async function getEventTypeService(id: number) {
    if (!id || id <= 0) {
        throw badRequest("Invalid event type ID provided");
    }

    const eventType = await getEventTypeRepository(id);
    if (!eventType) {
        throw notFound("Event type not found");
    }

    return eventType;
}

export async function getAllEventTypesByHostService(hostId: number) {
    if (!hostId || hostId <= 0) {
        throw badRequest("Invalid host ID provided");
    }

    const eventTypes = await getAllEventTypesByHostRepository(hostId);
    return eventTypes;
}

export async function updateEventTypeService(id: number, data: Partial<EventTypeInput>) {
    if (!id || id <= 0) {
        throw badRequest("Invalid event type ID provided");
    }

    const existing = await getEventTypeRepository(id);
    if (!existing) {
        throw notFound("Event type not found to update");
    }

    const updatedEventType = await updateEventTypeRepository(id, data);
    return updatedEventType;
}

export async function deleteEventTypeService(id: number) {
    if (!id || id <= 0) {
        throw badRequest("Invalid event type ID provided");
    }

    const existing = await getEventTypeRepository(id);
    if (!existing) {
        throw notFound("Event type not found to delete");
    }

    const deletedEventType = await deleteEventTypeRepository(id);
    return deletedEventType;
}