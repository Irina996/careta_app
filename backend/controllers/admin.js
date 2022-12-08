import { 
    deleteCar,
    deleteFines,
    insertBrand, 
    insertCar, 
    insertCarGroup, 
    insertClass, 
    insertColor, 
    insertFine, 
    insertModel, 
    selectAllCars, 
    selectAllFines, 
    selectBrandId, 
    selectCarGroupId, 
    selectClassId, 
    selectColorId, 
    selectModelId, 
    selectStateRentalList, 
    updateCar,
    updateRate,
    updateRent
} from "../services/index.js";
import state from '../config/state_code.js';

const getCars = async(req, res) => {
    try{
        //TODO: get page from client
        let page = 0;
        let rows_count = 5;

        let offset_number = page * rows_count;

        let cars = await selectAllCars(offset_number, rows_count);

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
    } catch(e){
        console.log(e);
    }
}

const createCarGroup = async(brand, model, car_class, gearbox, 
    creation_year, seats_number, fuel_consumption, cost, img_url)=> {
    
    try {
        let group_id = await selectCarGroupId(brand, model, car_class, gearbox, 
            creation_year, seats_number, fuel_consumption, cost);

        if (!group_id) {
            //create car group
            let brand_id = await selectBrandId(brand);
            if (!brand_id) {
                brand_id = await insertBrand(brand);
            }

            let model_id = await selectModelId(model);
            if (!model_id){
                model_id = await insertModel(model);
            }

            let class_id = await selectClassId(car_class);
            if (!class_id) {
                class_id = await insertClass(car_class);
            }

            group_id = await insertCarGroup(brand_id, 
                model_id, class_id, gearbox, creation_year, 
                fuel_consumption, seats_number, img_url, cost);

        }
        return group_id;
    }
    catch(err) {
        console.log(err);
        return 0;
    }
}

const addCar = async(req, res) => {
    try {
        const {
            brand, 
            model, 
            car_class, 
            gearbox, 
            creation_year, 
            seats_number, 
            fuel_consumption,
            img_url,
            car_number,
            color,
            cost
        } = req.body;


        let group_id = await createCarGroup(brand, model, car_class, gearbox, 
            creation_year, seats_number, fuel_consumption, cost, img_url);
        
        if(!group_id) {
            return res.status(500).json({ 
                success: false,
                message: 'fail to create car group' 
            })
        }

        let color_id = await selectColorId(color);
        if (!color_id) {
            color_id = await insertColor(color);
        }

        let car_id = await insertCar(group_id, color_id, car_number);
        if(!car_id) {
            return res.status(500).json({ 
                success: false,
                message: 'fail to create car' 
            })
        }

        return res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

const removeCar = async(req, res)=> {
    try {
        const {id} = req.body; // car_id
        let result = await deleteCar(id); 

        return res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

const editCar = async(req, res)=>{
    try {
        const {
            id,
            brand, 
            model, 
            car_class, 
            gearbox, 
            creation_year, 
            seats_number, 
            fuel_consumption,
            img_url,
            car_number,
            color,
            cost
        } = req.body;
        
        let group_id = await createCarGroup(brand, model, car_class, gearbox, 
            creation_year, seats_number, fuel_consumption, cost, img_url);

        let color_id = await selectColorId(color);
        if (!color_id) {
            color_id = await insertColor(color);
        }

        let r = await updateCar(car_number, color_id, group_id, id);

        return res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

const getRentalList = async(req, res)=> {
    try {
        let activeRent = await selectStateRentalList(state.paid);
        let badRent = await selectStateRentalList(state.bad);
        let goodRent = await selectStateRentalList(state.good);

        return res.status(200).json({
            success: true,
            message: 'successful',
            data: {
                active: activeRent,
                history: [badRent, goodRent]
            }
        });
    } catch(err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

const estimateRent = async(req, res, state_value)=>{
    try {
        const {id} = req.body; // rent_id

        let result = await updateRent(state_value, id);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch(err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

const getFines = async(req, res)=> {
    try {
        let result = await selectAllFines();
        return res.status(200).json({
            success: true,
            message: 'successful',
            data: result
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const removeFine = async(req, res)=> {
    try {
        const {id} = req.body; // fine_id
        let result = await deleteFines(id);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const addFine = async(req, res)=> {
    try {
        const {car_id, fine_cost, fine_date} = req.body;
        let fine_id = await insertFine(car_id, fine_cost, fine_date);

        if (fine_id && fine_cost > 100.0) {
            let r = await updateRate(fine_id, -1);
        }
        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const editFine = async(req, res)=> {
    try {
        const {car_id, fine_cost, fine_date} = req.body;
        let result = await updateFine(car_id, fine_cost, fine_date);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export {
    getCars,
    addCar,
    removeCar,
    editCar,
    getRentalList,
    estimateRent,
    getFines,
    removeFine,
    addFine,
    editFine,
}