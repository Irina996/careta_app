import express from 'express';
import state from '../config/state_code.js';
import {
    addCar,
    addFine,
    editCar,
    editFine,
    estimateRent,
    getCars,
    getFines,
    getRentalList,
    removeCar,
    removeFine,
} from '../controllers/admin.js';
import { getCarInfo } from '../controllers/car.js';
import { verifyAdmin } from '../middleware/authentication.js';
import { uploadImage } from '../middleware/image_upload.js';
import {
    carCharacteristics,
    fine,
    validateId,
} from '../middleware/validation.js';

const adminRouter = express.Router();
adminRouter.use(verifyAdmin);

adminRouter.get('/car/', getCars);
adminRouter.get('/car/info/', validateId, getCarInfo)
adminRouter.post('/car/add/', carCharacteristics, uploadImage, addCar);
adminRouter.post(
    '/car/edit/',
    validateId,
    carCharacteristics,
    uploadImage,
    editCar
);
adminRouter.post('/car/delete/', validateId, removeCar);

adminRouter.get('/fine/', getFines);
adminRouter.post('/fine/add/', fine, addFine);
adminRouter.post('/fine/delete/', validateId, removeFine);
adminRouter.post('/fine/edit/', fine, editFine);

adminRouter.get('/history/', getRentalList);
adminRouter.post('/history/add_good', validateId, async (req, res) =>
    estimateRent(req, res, state.good)
);
adminRouter.post('/history/add_bad', validateId, async (req, res) =>
    estimateRent(req, res, state.bad)
);

export default adminRouter;
