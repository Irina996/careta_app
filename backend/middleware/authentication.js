import jwt from 'jsonwebtoken';
import {roles, secretKey} from '../config/jwt.js';

const verifyToken = async(req, res, next, role)=> {
    try{
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            jwt.verify(bearerToken, secretKey, (err, authData)=>{
                if (err){
                    res.status(412)
                        .send({
                            success: false,
                            message: 'Authentication failed'
                        });
                } else {
                    if (authData.user.role == role) {
                        next();
                    }
                    else{
                        res.status(412)
                        .send({
                            success: false,
                            message: 'Access denied'
                        });
                    }
                }
            })
        } else {
            res.status(412)
                .send({
                    success: false,
                    message: 'Authentication failed'
                });
        }
    } catch(err){
        res.status(412)
            .send({
                success: false,
                message: 'Authentication failed'
            });
    }
}

const verifyClient = async(req, res, next) => verifyToken(req, res, next, roles.client);
const verifyAdmin = async(req, res, next) => verifyToken(req, res, next, roles.admin);

export {
    verifyClient,
    verifyAdmin,
};