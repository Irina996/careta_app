import express from 'express';
import { getFines, payFine } from '../controllers/fine.js';
import { verifyClient } from '../middleware/authentication.js';
import { validateId } from '../middleware/validation.js';

const fineRouter = express.Router();
fineRouter.use(verifyClient);

fineRouter.get('/', validateId, getFines);
//fineRouter.post('/pay', validateId, payFine);

export default fineRouter;