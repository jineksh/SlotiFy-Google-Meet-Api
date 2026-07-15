import { z } from "zod";

export const createBookingSchema = z.object({
    slotId: z.string(),
    inviteeEmail: z.email('Invalid email address'),
    inviteeName: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    inviteeNotes: z.string().optional(),
});

export const listHostBookingsQuerySchema = z.object({
    status: z.string().optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
}).refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: "from must be before or equal to to",
    path: ["to"],
});

export const bookingSchema = createBookingSchema;
export const updateBookingSchema = createBookingSchema.partial();

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingUpdateInput = z.infer<typeof updateBookingSchema>;
export type ListHostBookingsQueryInput = z.infer<typeof listHostBookingsQuerySchema>;
