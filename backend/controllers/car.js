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
    } = req.body;

    try {
        let cars = await selectCarGroup(brand, model, 
            class_name, gearbox_type, year_start, 
            year_finish, seats_number
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