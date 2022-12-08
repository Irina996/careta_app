import express from 'express'
import { carsFilter, validateId } from '../middleware/validation.js';
import { getCars, getCarInfo} from '../controllers/car.js';

const mainRouter = express.Router();

mainRouter.get('/', carsFilter, getCars);
mainRouter.get('/car/', validateId, getCarInfo);

export default mainRouter;