import { encrypt, stripe } from '../config/stripe.js';
import { selectBookingCost } from '../services/booking.js';
import { insertCreditData, selectCreditData } from '../services/client.js';
import { selectFineCost } from '../services/fine.js';
import { payBooking } from './booking.js';
import { payFine } from './fine.js';
import CryptoJS from 'crypto-js';

const createPaymentIntent = async (id, payment_purpose, payment_method_id) => {
    try {
        let intent;
        let payment_cost = 0;
        if (payment_purpose == 'rent') {
            payment_cost = await selectBookingCost(id);
        } else if (payment_purpose == 'fine') {
            payment_cost = await selectFineCost(id);
        }

        if (payment_cost == 0) {
            intent.status = 'wrong purpose';
            return intent;
        }

        intent = await stripe.paymentIntents.create({
            payment_method: payment_method_id,
            amount: parseInt(payment_cost * 100),
            currency: 'byn',
            confirmation_method: 'manual',
            confirm: true,
        });
        return intent;
    } catch (err) {
        intent.status = 'error';
        return intent;
    }
};

const confirmPaymentIntent = async (payment_intent_id) => {
    try {
        let intent = await stripe.paymentIntents.confirm(payment_intent_id);
        return intent;
    } catch (err) {
        intent.status = 'error';
        return intent;
    }
};

const generateResponse = async (req, res, intent) => {
    if (
        intent.status === 'requires_action' &&
        intent.next_action.type === 'use_stripe_sdk'
    ) {
        // Tell the client to handle the action
        return {
            requires_action: true,
            payment_intent_client_secret: intent.client_secret,
        };
    } else if (intent.status === 'succeeded') {
        if (req.body.payment_purpose == 'rent') {
            return payBooking(req, res);
        } else if (req.body.payment_purpose == 'fine') {
            return payFine(req, res);
        } else {
            return res.send({
                error: 'Invalid Payment purpose',
            });
        }
    } else {
        // Invalid status
        return res.send({
            error: 'Invalid PaymentIntent status',
        });
    }
};

const pay = async (req, res) => {
    try {
        let intent;
        if (req.body.payment_method_id) {
            intent = await createPaymentIntent(
                req.body.id, // id of payment object
                req.body.payment_purpose,
                req.body.payment_method_id
            );
        } else if (req.body.payment_intent_id) {
            intent = await confirmPaymentIntent(req);
        }

        return await generateResponse(req, res, intent);
    } catch (err) {
        return res.send({ error: err.message });
    }
};

const saveCardData = async (req, res) => {
    try {
        const { client_id, card_number, card_holder, exp_date, CVV } = req.body;
        let enc_card = CryptoJS.AES.encrypt(
            card_number.toString(),
            encrypt
        ).toString();
        let enc_cvv = CryptoJS.AES.encrypt(CVV.toString(), encrypt).toString();
        let result = await insertCreditData(
            client_id,
            enc_card,
            card_holder,
            exp_date,
            enc_cvv
        );
        return res.status(200).json({
            success: true,
            message: 'success add data',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'fail',
        });
    }
};

const getCardData = async (req, res) => {
    try {
        let card_data = await selectCreditData(req.query.client_id);
        
        card_data.card_number = CryptoJS.AES.decrypt(
            card_data.card_number,
            encrypt
        ).toString(CryptoJS.enc.Utf8);

        card_data.cvv = CryptoJS.AES.decrypt(card_data.cvv, encrypt).toString(
            CryptoJS.enc.Utf8
        );

        return res.status(200).json({
            success: true,
            message: 'success',
            data: card_data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'fail',
        });
    }
};

export { pay, saveCardData, getCardData };
