import express from 'express';
import { getRentalList } from '../controllers/rent.js';
import { validateId } from '../middleware/validation.js';


const rentalRouter = express.Router();

rentalRouter.get('/list/', validateId, getRentalList);

export default rentalRouter;