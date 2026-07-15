import { createSuccessResponse } from '../utils/successResponse.js';
import {
    createBookingOptimastic as createBookingOptimasticService,
    listHostBookings as listHostBookingsService,
} from '../service/booking.service.js';



export async function createBookingController(req: any, res: any) {

    const input = req.body;
    const booking = await createBookingOptimasticService(input);
    res.status(201).json(booking);

}

export async function listHostBookingsController(req: any, res: any) {
    const hostId = Number(req.params.hostId);
    const filters = req.query;
    const bookings = await listHostBookingsService(hostId, filters);

    return createSuccessResponse(res, bookings, 'Host bookings fetched successfully');
}