import { Router } from "express";
import { validateDto } from "../../middleware/validate.js";
import { eventTypeSchema } from "../../dtos/eventType.dto.js";
import {
    createEventTypeController,
    getEventTypeController,
    getAllEventTypesByHostController,
    updateEventTypeController,
    deleteEventTypeController
} from "../../controller/eventType.controller.js";

const eventTypeRouter = Router();

eventTypeRouter.post("/", validateDto(eventTypeSchema), createEventTypeController);
eventTypeRouter.get("/:id", getEventTypeController);
eventTypeRouter.get("/host/:hostId", getAllEventTypesByHostController);
eventTypeRouter.patch("/:id", validateDto(eventTypeSchema.partial()), updateEventTypeController);
eventTypeRouter.delete("/:id", deleteEventTypeController);

export default eventTypeRouter;