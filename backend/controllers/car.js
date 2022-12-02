import { selectCarGroup, selectCarInfo } from "../services/index.js";

const getCars = async(req, res) => {
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
    } = req.body;

    try {
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
    const {car_group_id} = req.body;
    try{
        let info = await selectCarInfo(car_group_id);
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