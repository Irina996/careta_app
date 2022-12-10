import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { roles, secretKey } from '../config/jwt.js';
import { selectAdmin, selectClient, selectUser } from '../services/index.js';

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await selectUser(email);
        // console.log('User', user);
        if (user) {
            if (await bcrypt.compare(password, user.user_password)) {
                let client_id = await selectClient(user.user_id);
                if (client_id) {
                    user.id = client_id;
                    user.role = roles.client;
                } else if (await selectAdmin(user.user_id)) {
                    user.role = roles.admin;
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'login failed',
                    });
                }

                console.log(user);

                jwt.sign({ user }, secretKey, (err, token) => {
                    return res.status(201).json({
                        success: true,
                        message: 'login successful',
                        data: token,
                    });
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'wrong password',
                });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: 'wrong email',
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'wrong email',
        });
    }
};

export { getUser };
