import express from 'express';
import { getFines } from '../controllers/fine.js';
import { verifyClient } from '../middleware/authentication.js';

const fineRouter = express.Router();
fineRouter.use(verifyClient);

fineRouter.get('/', getFines);

export default fineRouter;
