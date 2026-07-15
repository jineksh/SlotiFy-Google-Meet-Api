import {
    createBookingOptimastic as createBookingOptimasticService
} from '../service/booking.service.js';



export async function createBookingController(req: any, res: any) {

    const input = req.body;
    const booking = await createBookingOptimasticService(input);
    res.status(201).json(booking);

}