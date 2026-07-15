import { userRouter } from "./user.route.js";
import eventTypeRouter from "./eventType.route.js";
import availabilityRouter from "./availability.route.js";
import { bookingRouter } from "./booking.route.js";
import { Router } from "express";

export const v1Router: Router = Router();

v1Router.use('/users', userRouter);
v1Router.use('/event-types', eventTypeRouter);
v1Router.use('/', availabilityRouter);
v1Router.use('/bookings', bookingRouter);