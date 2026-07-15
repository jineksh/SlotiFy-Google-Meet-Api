import { z } from "zod";


const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const availabilityBaseSchema = z.object({
    weekday: z.number()
        .int()
        .min(0, "weekday must be between 0 and 6")
        .max(6, "weekday must be between 0 and 6"),
    startTime: z.string().regex(timeRegex, "startTime must be in HH:MM format"),
    endTime: z.string().regex(timeRegex, "endTime must be in HH:MM format"),
    isActive: z.boolean().optional(),
    timezone: z.string().optional(),
});




export const availabilitySchema = availabilityBaseSchema.superRefine((data, ctx) => {
    if (data.startTime >= data.endTime) {
        ctx.addIssue({
            code: "custom",
            message: "startTime must be less than endTime",
            path: ["startTime", "endTime"],
        });
    }
});

export const updateAvailabilitySchema = availabilityBaseSchema.partial();

export type AvailabilityInput = z.infer<typeof availabilitySchema>;
export type AvailabilityUpdateInput = z.infer<typeof updateAvailabilitySchema>;
