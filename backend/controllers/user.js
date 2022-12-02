import bcrypt from 'bcrypt';
import { 
    selectUser
} from "../services/index.js";

const getUser = async(req, res) => {
    const {
        email, 
        password
    } = req.body;
    
    let user = await selectUser(email);
    console.log('User', user);
    if (user){
        if (await bcrypt.compare(password, user.user_password)) {

            console.log('login success');
            return res.status(201).json({
                success: true,
                message: 'login successful',
                data: user
            });
        } else {
            console.log('login wrong password');
            return res.status(403).json({
                success: false,
                message: 'wrong password'
            });
        }
    }
    console.log('login fail');
    return res.status(403).json({
        success: false,
        message: 'wrong email'
    });
}

export {getUser};