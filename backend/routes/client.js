import express from 'express'
import { createClient} from '../controllers/client.js';
import {
    register as registerValidation
} from '../middleware/validation.js'

const clientRouter = express.Router();

clientRouter.post('/register', registerValidation, createClient);

export default clientRouter;