import {
    createBookingController
} from '../../controller/booking.controller.js';
import { validateDto } from "../../middleware/validate.js";
import { bookingSchema } from "../../dtos/booking.dto.js";

import { Router } from "express";

export const bookingRouter: Router = Router();


bookingRouter.post('/',validateDto(bookingSchema) ,createBookingController);