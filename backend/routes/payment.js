import express from 'express';
import {
    createCheckoutSession,
    getCardData,
    saveCardData,
    successPay,
} from '../controllers/payment.js';
import { verifyClient } from '../middleware/authentication.js';
import { credit_card, payment } from '../middleware/validation.js';

const paymentRouter = express.Router();

paymentRouter.get('/stripe-key', verifyClient, (req, res) => {
    res.send({ publishableKey: publicKey });
});

paymentRouter.post('/card-data', verifyClient, credit_card, saveCardData);
paymentRouter.get('/card-data', verifyClient, getCardData);

paymentRouter.post(
    '/create-checkout-session',
    verifyClient,
    payment,
    createCheckoutSession
);
paymentRouter.get('/success', successPay);

export default paymentRouter;
