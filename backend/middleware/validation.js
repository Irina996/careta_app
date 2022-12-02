import Validator from 'validatorjs';

const validator = async(body, rules, customMessage, callback) => {
    const validation = new Validator(body, rules, customMessage);

    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const phoneRegex = /\+\d{3}\(\d{2}\)\d{7}/;
const dateRegex = /^(\d\d\d\d)\-(0\d|1[0-2])\-(0\d|1\d|2\d|3[0-1])$/;

// password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');

//phone policy
Validator.register('phone', value => phoneRegex.test(value),
    'phone must be such +xxx(xx)xxxxxxx');

//date policy
Validator.register('after_now', value => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    return Date.parse(value) > Date.parse(currentDate);
}, 'date must be after current date');

Validator.register('after_or_equal_now', value => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    return Date.parse(value) >= Date.parse(currentDate);
}, 'date must be equal or after current date');

const register = async(req, res, next) => {
    const validationRule = {
        email: 'required|email',
        password: 'required|min:6|strict',
        client_name: 'required',
        surname: 'required',
        phone: 'required|phone',
        client_address: 'required'
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
        email: 'required|email',
        password: 'required|min:6|strict'
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

const carsFilter = async (req, res, next) => {
    const validationRule = {
        brand: 'present',
        model: 'present',
        class_name: 'present',
        gearbox_type: 'present',
        year_start: 'required|digits:4',
        year_finish: 'required|digits:4',
        seats_number: 'required',
        start_date: 'required|date|after_or_equal_now',
        end_date: 'required|after_now'
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

const booking = async(req, res, next) => {
    const validationRule = {
        client_id: 'required|integer', 
        car_group_id: 'required|integer',
        start_date: 'required|after_or_equal_now', 
        end_date: 'required|after_now',
        baby_seat_amount: 'required',
        is_driver: 'required|boolean'
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

const validateId = async(req, res, next) => {
    let validationRule = {
        id: 'required|integer'
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
    carsFilter,
    booking,
    validateId,
}