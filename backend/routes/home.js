import express from 'express'
import { carsFilter } from '../middleware/validation.js';
import { getCars, getCarInfo} from '../controllers/car.js';


const mainRouter = express.Router();

mainRouter.get('/', carsFilter, getCars);
mainRouter.get('/car/', getCarInfo);

export default mainRouter;