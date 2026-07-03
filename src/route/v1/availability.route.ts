import { Router } from 'express';
import { validateDto } from '../../middleware/validate.js';
import { userIdFromHeader } from '../../middleware/userIdFromHeader.js';

import {
    createAvailabilityController,
    getAvailabilityByIdController,
    getAvailabilitiesByHostController,
    updateAvailabilityController,
    deleteAvailabilityController,

    createAvailabilityExceptionController,
    getAvailabilityExceptionByIdController,
    getAvailabilityExceptionsByHostController,
    updateAvailabilityExceptionController,
    deleteAvailabilityExceptionController
} from '../../controller/availability.controller.js';

import {
    availabilitySchema,
    updateAvailabilitySchema
} from '../../dtos/availability.dto.js';

import {
    availabilityExceptionSchema,
    updateAvailabilityExceptionSchema
} from '../../dtos/availabilityException.dto.js';

const availabilityRouter = Router();

// Availability
availabilityRouter.post(
    '/availability',
    userIdFromHeader,
    validateDto(availabilitySchema),
    createAvailabilityController
);
availabilityRouter.get('/availability', userIdFromHeader, getAvailabilitiesByHostController);
availabilityRouter.get('/availability/:id', userIdFromHeader, getAvailabilityByIdController);
availabilityRouter.patch(
    '/availability/:id',
    userIdFromHeader,
    validateDto(updateAvailabilitySchema),
    updateAvailabilityController
);
availabilityRouter.delete('/availability/:id', userIdFromHeader, deleteAvailabilityController);

// AvailabilityException
availabilityRouter.post(
    '/availability-exception',
    userIdFromHeader,
    validateDto(availabilityExceptionSchema),
    createAvailabilityExceptionController
);
availabilityRouter.get(
    '/availability-exception',
    userIdFromHeader,
    getAvailabilityExceptionsByHostController
);
availabilityRouter.get(
    '/availability-exception/:id',
    userIdFromHeader,
    getAvailabilityExceptionByIdController
);
availabilityRouter.patch(
    '/availability-exception/:id',
    userIdFromHeader,
    validateDto(updateAvailabilityExceptionSchema),
    updateAvailabilityExceptionController
);
availabilityRouter.delete(
    '/availability-exception/:id',
    userIdFromHeader,
    deleteAvailabilityExceptionController
);

export default availabilityRouter;


