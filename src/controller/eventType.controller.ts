import { Request, Response, NextFunction } from "express";
import { createSuccessResponse } from "../utils/successResponse.js";
import {
    createEventTypeService,
    getEventTypeService,
    getAllEventTypesByHostService,
    updateEventTypeService,
    deleteEventTypeService
} from '../service/eventType.service.js';

export async function createEventTypeController(req: Request, res: Response, _next: NextFunction) {
    const eventType = await createEventTypeService(req.body);
    createSuccessResponse(res, eventType, 'Event type created successfully', 201);
}

export async function getEventTypeController(req: Request, res: Response, _next: NextFunction) {
    const id = req.params.id;
    const eventType = await getEventTypeService(Number(id));
    createSuccessResponse(res, eventType, 'Event type fetched successfully');
}

export async function getAllEventTypesByHostController(req: Request, res: Response, _next: NextFunction) {
    const hostId = req.params.hostId;
    const eventTypes = await getAllEventTypesByHostService(Number(hostId));
    createSuccessResponse(res, eventTypes, 'Host event types fetched successfully');
}

export async function updateEventTypeController(req: Request, res: Response, _next: NextFunction) {
    const id = req.params.id;
    const eventType = await updateEventTypeService(Number(id), req.body);
    createSuccessResponse(res, eventType, 'Event type updated successfully');
}

export async function deleteEventTypeController(req: Request, res: Response, _next: NextFunction) {
    const id = req.params.id;
    const eventType = await deleteEventTypeService(Number(id));
    createSuccessResponse(res, eventType, 'Event type deleted successfully');
}