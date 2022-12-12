import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { secretKey } from '../config/jwt.js';
import {
    insertUser,
    insertClient,
    selectUserIdByEmail,
    selectUser,
} from '../services/index.js';

const createClient = async (req, res) => {
    try {
        const { email, password, client_name, surname, phone, client_address } =
            req.body;

        if (await selectUserIdByEmail(email)) {
            // user alredy exist
            return res.status(403).json({
                success: false,
                message: 'user already exist',
            });
        }

        let hashed_pswd = await bcrypt.hash(password, 10);
        let user_id = await insertUser(email, hashed_pswd);
        if (user_id) {
            await insertClient(
                user_id,
                client_name,
                surname,
                phone,
                client_address
            );
            let user = await selectUser(email);
            return jwt.sign({ user }, secretKey, (err, token) => {
                return res.status(201).json({
                    success: true,
                    message: 'register successful',
                    role: 'client',
                    data: token,
                });
            });
        }
        return res.status(403).json({
            success: false,
            message: 'register failed',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'fail',
        });
    }
};

export { createClient };
