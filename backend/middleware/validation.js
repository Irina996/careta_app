import Validator from 'validatorjs';

const validator = async(req, rules, customMessage, callback) => {
    let info = {};
    if (!isEmpty(req.body)) {
        info = req.body;
    } else if (!isEmpty(req.query)) {
        info = req.query;
    }

    const validation = new Validator(info, rules, customMessage);

    validation.passes(() => callback(null, true));

    validation.fails(() => callback(validation.errors, false));
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const phoneRegex = /\+\d{3}\(\d{2}\)\d{7}/;
const dateRegex = /^(\d\d\d\d)\-(0\d|1[0-2])\-(0\d|1\d|2\d|3[0-1])$/;
const vinRegex = /\d\d\d\d [A-Z][A-Z]-[1-7]/; // vehicle identification number

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

//car number policy
Validator.register('vin', value => vinRegex.test(value),
    'car number must be composed of four digits, two letters and another digit (e.g. 1234 AB-5)')

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

const register = async(req, res, next) => {
    const validationRule = {
        email: 'required|email',
        password: 'required|min:6|strict',
        client_name: 'required',
        surname: 'required',
        phone: 'required|phone',
        client_address: 'required'
    }

    await validator(req, validationRule, {}, (err, status) => {
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

    await validator(req, validationRule, {}, (err, status) => {
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
    await validator(req, validationRule, {}, (err, status) => {
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
    await validator(req, validationRule, {}, (err, status) => {
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
    await validator(req, validationRule, {}, (err, status) => {
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

const carCharacteristics = async(req, res, next)=> {
    let validationRule = {
        brand: "required|string", 
        model: "required", 
        car_class: "required", 
        gearbox: "required", 
        creation_year: "required|integer|min:2000", 
        seats_number: "required|integer|min:1", 
        fuel_consumption: "required|numeric",
        car_number: "required|vin",
        color: "required",
        cost: "required|numeric|min:1",
    }
    await validator(req, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        }else if (!req.files){
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: 'image  is required'
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const fine = async(req, res, next) => {
    let validationRule = {
        car_id: "required|integer", 
        fine_cost: "required|numeric|min:0", 
        fine_date: "required|date"
    }
    await validator(req, validationRule, {}, (err, status) => {
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
    carCharacteristics,
    fine,
}