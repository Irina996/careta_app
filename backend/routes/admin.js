import express from 'express';
import state from '../config/state_code.js';
import { addCar, editCar, estimateRent, getCars, getRentalList, removeCar } from '../controllers/admin.js';
import { uploadImage } from '../middleware/image_upload.js';
import { carCharacteristics, validateId } from '../middleware/validation.js';

const adminRouter = express.Router();

adminRouter.get('/car/', getCars);
adminRouter.post('/car/add/', carCharacteristics, uploadImage, addCar);
adminRouter.post('/car/edit/', validateId, carCharacteristics, uploadImage, editCar);
adminRouter.post('/car/delete/', validateId, removeCar);

adminRouter.get('/fine/');
adminRouter.post('/fine/add/');
adminRouter.post('/fine/delete/');

adminRouter.get('/history/', getRentalList);
adminRouter.post('/history/add_good', validateId, async(req, res)=> estimateRent(req, res, state.good));
adminRouter.post('/history/add_bad', validateId, async(req, res)=> estimateRent(req, res, state.bad));

export default adminRouter;