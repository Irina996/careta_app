import { 
    deleteCar,
    insertBrand, 
    insertCar, 
    insertCarGroup, 
    insertClass, 
    insertColor, 
    insertModel, 
    selectAllCars, 
    selectBrandId, 
    selectCarGroupId, 
    selectClassId, 
    selectColorId, 
    selectModelId, 
    updateCar
} from "../services/index.js"

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

export {
    getCars,
    addCar,
    removeCar,
    editCar,
}