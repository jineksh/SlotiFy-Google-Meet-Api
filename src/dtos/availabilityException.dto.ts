import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const availabilityExceptionBaseSchema = z.object({
    eventTypeId: z.number().int().positive("eventTypeId must be a valid number"),
    date: z.string().regex(dateRegex, "date must be in YYYY-MM-DD format"),
    startTime: z.string().regex(timeRegex, "startTime must be in HH:MM format"),
    endTime: z.string().regex(timeRegex, "endTime must be in HH:MM format"),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"]),
    reason: z.string().optional(),
    timezone: z.string().optional(),
});


export const availabilityExceptionSchema = availabilityExceptionBaseSchema.superRefine((data, ctx) => {
    if (data.type === "BLOCK_FULL_DAY") {
        if (!data.startTime) {
            ctx.addIssue({
                code: "custom",
                message: "startTime is required for BLOCK_FULL_DAY type",
                path: ["startTime"],
            });
        }
        if (!data.endTime) {
            ctx.addIssue({
                code: "custom",
                message: "endTime is required for BLOCK_FULL_DAY type",
                path: ["endTime"],
            });
        }
        if (data.startTime && data.endTime && data.startTime >= data.endTime) {
            ctx.addIssue({
                code: "custom",
                message: "startTime must be less than endTime for BLOCK_FULL_DAY type",
                path: ["startTime", "endTime"],
            });
        }
    }
});

export const updateAvailabilityExceptionSchema = availabilityExceptionBaseSchema.partial();

export type AvailabilityExceptionInput = z.infer<typeof availabilityExceptionSchema>;
export type AvailabilityExceptionUpdateInput = z.infer<typeof updateAvailabilityExceptionSchema>;
