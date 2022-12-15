import { encrypt, stripe } from '../config/stripe.js';
import { selectBookingCost } from '../services/booking.js';
import { insertCreditData, selectCreditData } from '../services/client.js';
import { selectFineCost } from '../services/fine.js';
import { payBooking } from './booking.js';
import { payFine } from './fine.js';
import CryptoJS from 'crypto-js';
import { client_url, server_url } from '../config/url.js';

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

const createCheckoutSession = async (req, res) => {
    try {
        const { id, payment_purpose } = req.body;

        let payment_cost = 0;
        if (payment_purpose == 'rent') {
            payment_cost = await selectBookingCost(id);
        } else if (payment_purpose == 'fine') {
            payment_cost = await selectFineCost(id);
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: payment_purpose,
                        },
                        unit_amount: parseInt(payment_cost * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${server_url}/payment/success/?session_id={CHECKOUT_SESSION_ID}&purpose=${payment_purpose}&product=${id}`,
            cancel_url: `${client_url}/`,
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const successPay = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.query.session_id
        );

        // create rent or delete fine
        if (req.query.purpose == 'rent') {
            await payBooking(req.query.product);
        } else {
            await payFine(req.query.product);
        }

        res.redirect(`${client_url}/thanks`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { saveCardData, getCardData, createCheckoutSession, successPay };
