import {
    createBookingController,
    listHostBookingsController,
} from '../../controller/booking.controller.js';
import { validateDto } from "../../middleware/validate.js";
import { bookingSchema, listHostBookingsQuerySchema } from "../../dtos/booking.dto.js";

import { Router } from "express";

export const bookingRouter: Router = Router();


bookingRouter.get('/host/:hostId', validateDto(listHostBookingsQuerySchema, "query"), listHostBookingsController);
bookingRouter.post('/',validateDto(bookingSchema) ,createBookingController);