import express from 'express'
import {
    login as loginValidation
} from '../middleware/validation.js'
import { getUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/login', loginValidation, getUser);

export default userRouter;