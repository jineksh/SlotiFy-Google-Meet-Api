import { z } from "zod";

export const eventTypeSchema = z.object({
    hostId: z.number().int().positive("hostId must be a valid number"),

    description: z.string({
        error: "description must be a string",
    }).optional(),

    locationType: z.string().min(1, "locationType is required"),

    locationValue: z.string({
        error: "locationValue must be a string",
    }).optional(),

    duration: z.number({
        error: "duration must be a number",
    }),

    bufferBeforeMinutes: z.number({
        error: "bufferBeforeMinutes must be a number",
    }),

    bufferAfterMinutes: z.number({
        error: "bufferAfterMinutes must be a number",
    }),
});


export type EventTypeInput = z.infer<typeof eventTypeSchema>;


