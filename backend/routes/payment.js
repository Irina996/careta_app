import express from 'express';
import { getCardData, pay, saveCardData } from '../controllers/payment.js';
import { verifyClient } from '../middleware/authentication.js';
import { credit_card, payment } from '../middleware/validation.js';

const paymentRouter = express.Router();
paymentRouter.use(verifyClient);

paymentRouter.get('/stripe-key', (req, res) => {
    res.send({ publishableKey: publicKey });
});

paymentRouter.post('/pay', payment, pay);
paymentRouter.post('/card-data', credit_card, saveCardData);
paymentRouter.get('/card-data', getCardData);

export default paymentRouter;
