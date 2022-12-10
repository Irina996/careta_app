import express from 'express';
import { pay } from '../controllers/payment.js';
import { verifyClient } from '../middleware/authentication.js';
import { payment } from '../middleware/validation.js';

const paymentRouter = express.Router();
paymentRouter.use(verifyClient);

paymentRouter.get('/stripe-key', (req, res) => {
    res.send({ publishableKey: publicKey });
});

paymentRouter.post('/pay', payment, pay);

export default paymentRouter;
