import express from 'express';
import { getRentalList } from '../controllers/rental.js';


const rentalRouter = express.Router();

rentalRouter.get('/list/', getRentalList);

export default rentalRouter;