import dotenv from 'dotenv'
import Stripe from 'stripe';

dotenv.config();
const secretKey = process.env.STRIPESECRETKEY
const publicKey = process.env.STRIPPUBLICKEY
const stripe = Stripe(secretKey);

export {
    stripe, 
    publicKey,
};