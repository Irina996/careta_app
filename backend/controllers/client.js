import bcrypt from 'bcrypt';
import { 
    insertUser, 
    insertClient, 
    selectClient, 
    selectUserIdByEmail 
} from "../services/index.js";

const createClient = async(req, res) => {
    const {
        email, 
        password, 
        client_name, 
        surname, 
        phone, 
        client_address
    } = req.body;

    if (await selectUserIdByEmail(email)) {
        // user alredy exist
        return res.status(403).json({
            success: false,
            message: 'user already exist'
        });
    }

    let hashed_pswd = await bcrypt.hash(password, 10);
    let user_id = await insertUser(email, hashed_pswd);
    if (user_id){
        await insertClient(user_id, client_name, surname, phone, client_address);
        return res.status(201).json({
            success: true,
            message: 'register successful'
        });
    } 
    return res.status(403).json({
        success: false,
        message: 'register failed'
    });
}

const getClient = async(req, res) => {
    const {
        email, 
        password
    } = req.body;

    let hashed_pswd = await bcrypt.hash(password, 10);
    let client = await selectClient(email, hashed_pswd);
    if (client){
        return client;
    }
    return {};
}

export {createClient, getClient};