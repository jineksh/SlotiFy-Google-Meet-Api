import { userRouter } from "./user.route.js";
import { Router } from "express";

export const v1Router : Router = Router();


v1Router.use('/users',userRouter);