import { userRouter } from "./user.route.js";
import eventTypeRouter from "./eventType.route.js";
import { Router } from "express";

export const v1Router : Router = Router();


v1Router.use('/users',userRouter);
v1Router.use('/event-type',eventTypeRouter);