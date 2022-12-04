import express from 'express';
import { addCar, editCar, getCars, removeCar } from '../controllers/admin.js';
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

adminRouter.get('/history/');

export default adminRouter;