import express from 'express';
import { cancelBooking, createBooking, getBookingList, payBooking } from '../controllers/booking.js';
import { verifyClient } from '../middleware/authentication.js';
import { booking, validateId } from '../middleware/validation.js';

const bookingRouter = express.Router();
bookingRouter.use(verifyClient);

bookingRouter.get('/list/',validateId, getBookingList);
bookingRouter.post('/create/', booking, createBooking);
bookingRouter.post('/delete/', validateId, cancelBooking);
//bookingRouter.post('/pay/', validateId, payBooking);

export default bookingRouter;