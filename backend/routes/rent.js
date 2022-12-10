import express from 'express';
import { getRentalList } from '../controllers/rent.js';
import { verifyClient } from '../middleware/authentication.js';
import { validateId } from '../middleware/validation.js';


const rentalRouter = express.Router();
rentalRouter.use(verifyClient);
rentalRouter.get('/list/', getRentalList);

export default rentalRouter;