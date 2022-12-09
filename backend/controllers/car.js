import { selectCarGroup, selectCarInfo } from "../services/index.js";

const getCarParameters = (object) => {
    let {
        brand, 
        model,
        class_name, 
        gearbox_type,
        year_start,
        year_finish,
        seats_number,
        start_date, 
        end_date
    } = object;

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    if (brand == undefined) {
        object.brand = '';
    }
    if (model == undefined) {
        object.model = '';
    }
    if (class_name == undefined) {
        object.class_name = '';
    }
    if (gearbox_type == undefined) {
        object.gearbox_type = '';
    }
    if (year_start == undefined || year_start == ''){
        object.year_start = 2000;
    }
    if (year_finish == undefined || year_finish == ''){
        object.year_finish = year;
    }
    if (seats_number == undefined) {
        object.seats_number = '';
    }
    if (start_date == undefined || start_date == '') {
        object.start_date = currentDate;
    }
    if (end_date == undefined || end_date == '') {
        object.end_date = `${year+10}-${month}-${day}`
    }
 
    return object
}

const getCars = async(req, res) => {
    try {
        const {
            brand, 
            model,
            class_name, 
            gearbox_type,
            year_start,
            year_finish,
            seats_number,
            start_date, 
            end_date
        } = getCarParameters(req.query);

        //TODO: get page from client
        let page = 0;
        let rows_count = 5;

        let offset_number = page * rows_count;
        
        let cars = await selectCarGroup(brand, model, 
            class_name, gearbox_type, year_start, 
            year_finish, seats_number, offset_number, 
            rows_count, start_date, end_date
        );
        //console.log(cars);
        
        if (cars) {
            return res.status(200).json({
                success: true,
                message: 'successful',
                data: cars
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'fail'
            });
        }
    } catch(e) {
        console.error(e)
    }
}

const getCarInfo = async(req, res) => {
    try{
        const {id} = req.query; // car_group_id

        let info = await selectCarInfo(id);
        if (info) {
            return res.status(200).json({
                success: true,
                message: 'successful',
                data: info
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'fail'
            });
        }
    } catch(e) {
        console.error(e);
    }
}

export {
    getCars,
    getCarInfo
};