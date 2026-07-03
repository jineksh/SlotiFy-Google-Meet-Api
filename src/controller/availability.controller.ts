import { Request, Response, NextFunction } from 'express';
import { createSuccessResponse } from '../utils/successResponse.js';

import {
    createAvailabilityService,
    listRuleByIDService,
    listRuleByHostService,
    updateAvailabilityService,
    deleteAvailabilityService,

    createAvailabilityExceptionService,
    listRuleByIDExceptionService,
    listRuleByHostExceptionService,
    updateAvailabilityExceptionService,
    deleteAvailabilityExceptionService
} from '../service/availability.service.js';

export async function createAvailabilityController(req: Request, res: Response, _next: NextFunction) {
    const availability = await createAvailabilityService({
        ...req.body,
        userId: req.userId,
    });
    createSuccessResponse(res, availability, 'Availability created successfully', 201);
}

export async function getAvailabilityByIdController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const availability = await listRuleByIDService(id, Number(req.userId));
    createSuccessResponse(res, availability, 'Availability fetched successfully');
}

export async function getAvailabilitiesByHostController(req: Request, res: Response, _next: NextFunction) {
    const availabilities = await listRuleByHostService(Number(req.userId));
    createSuccessResponse(res, availabilities, 'Availabilities fetched successfully');
}

export async function updateAvailabilityController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const updated = await updateAvailabilityService(id, Number(req.userId), req.body);
    createSuccessResponse(res, updated, 'Availability updated successfully');
}

export async function deleteAvailabilityController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const deleted = await deleteAvailabilityService(id, Number(req.userId));
    createSuccessResponse(res, deleted, 'Availability deleted successfully');
}

export async function createAvailabilityExceptionController(req: Request, res: Response, _next: NextFunction) {
    const exception = await createAvailabilityExceptionService({
        ...req.body,
        userId: req.userId,
    });
    createSuccessResponse(res, exception, 'Availability exception created successfully', 201);
}

export async function getAvailabilityExceptionByIdController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const exception = await listRuleByIDExceptionService(id, Number(req.userId));
    createSuccessResponse(res, exception, 'Availability exception fetched successfully');
}

export async function getAvailabilityExceptionsByHostController(req: Request, res: Response, _next: NextFunction) {
    const exceptions = await listRuleByHostExceptionService(Number(req.userId));
    createSuccessResponse(res, exceptions, 'Availability exceptions fetched successfully');
}

export async function updateAvailabilityExceptionController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const updated = await updateAvailabilityExceptionService(id, Number(req.userId), req.body);
    createSuccessResponse(res, updated, 'Availability exception updated successfully');
}

export async function deleteAvailabilityExceptionController(req: Request, res: Response, _next: NextFunction) {
    const id = Number(req.params.id);
    const deleted = await deleteAvailabilityExceptionService(id, Number(req.userId));
    createSuccessResponse(res, deleted, 'Availability exception deleted successfully');
}


