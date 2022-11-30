import Validator from "validatorjs";

const validator = async(body, rules, customMessage, callback) => {
    const validation = new Validator(body, rules, customMessage);

    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const phoneRegex = /\+\d{3}\(\d{2}\)\d{7}/;

// password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');
//phone policy
Validator.register('phone', value => phoneRegex.test(value),
    'phone must be such +xxx(xx)xxxxxxx')

const register = async(req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|min:6|strict",
        "client_name": "required",
        "surname": "required",
        "phone": "required|phone",
        "client_address": "required"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const login = async(req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|min:6|strict"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

export {
    register, 
    login,
}