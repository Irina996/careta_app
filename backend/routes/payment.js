import express from 'express';
import { pay } from '../controllers/payment.js';

const paymentRouter = express.Router();

paymentRouter.get('/stripe-key', (req, res) => {
    res.send({ publishableKey: publicKey});
});
 
paymentRouter.post('/pay', pay);

export default paymentRouter;