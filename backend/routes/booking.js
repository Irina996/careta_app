import express from 'express';
import { getBookingList } from '../controllers/booking.js';


const bookingRouter = express.Router();

bookingRouter.get('/list/', getBookingList);

export default bookingRouter;