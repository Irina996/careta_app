import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWTSECRETKEY;
const roles = {
    admin: 'admin',
    client: 'client',
};

export { secretKey, roles };
