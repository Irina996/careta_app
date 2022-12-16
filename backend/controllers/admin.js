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
    selectAvailableCarId,
    selectBrandId,
    selectCarGroupId,
    selectCarGroupInfo,
    selectCarInfo,
    selectClassId,
    selectColorId,
    selectCountAllCars,
    selectModelId,
    selectRelatedBookingId,
    selectStateRentalList,
    updateBookingCar,
    updateCar,
    updateRate,
    updateRent,
} from '../services/index.js';
import state from '../config/state_code.js';

const getCars = async (req, res) => {
    try {
        const rows_count = 8;

        let count = await selectCountAllCars();
        let max_page_count = Math.ceil(count / rows_count);

        let page = 0;
        if (req.query.page != undefined) {
            page = req.query.page - 1;
        }

        let offset_number = page * rows_count;

        let cars = await selectAllCars(offset_number, rows_count);

        if (cars) {
            return res.status(200).json({
                success: true,
                message: 'successful',
                data: cars,
                max_page_count: max_page_count
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'fail',
            });
        }
    } catch (e) {
        console.log(e);
    }
};

const getCarInfo = async (req, res) => {
    try {
        const {id} = req.params; // car_id
        let car = await selectCarInfo(id);
        return res.status(200).json({
            success: true,
            message: 'successful',
            data: car,
        });
    } catch (err) {
        console.log(err);
    }
}

const createCarGroup = async (
    brand,
    model,
    car_class,
    gearbox,
    creation_year,
    seats_number,
    fuel_consumption,
    cost,
    img_url
) => {
    try {
        let group_id = await selectCarGroupId(
            brand,
            model,
            car_class,
            gearbox,
            creation_year,
            seats_number,
            fuel_consumption,
            cost
        );

        if (!group_id) {
            //create car group
            let brand_id = await selectBrandId(brand);
            if (!brand_id) {
                brand_id = await insertBrand(brand);
            }

            let model_id = await selectModelId(model);
            if (!model_id) {
                model_id = await insertModel(model);
            }

            let class_id = await selectClassId(car_class);
            if (!class_id) {
                class_id = await insertClass(car_class);
            }

            group_id = await insertCarGroup(
                brand_id,
                model_id,
                class_id,
                gearbox,
                creation_year,
                fuel_consumption,
                seats_number,
                img_url,
                cost
            );
        }
        return group_id;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

const addCar = async (req, res) => {
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
            cost,
        } = req.body;

        let group_id = await createCarGroup(
            brand,
            model,
            car_class,
            gearbox,
            creation_year,
            seats_number,
            fuel_consumption,
            cost,
            img_url
        );

        if (!group_id) {
            return res.status(500).json({
                success: false,
                message: 'fail to create car group',
            });
        }

        let color_id = await selectColorId(color);
        if (!color_id) {
            color_id = await insertColor(color);
        }

        let car_id = await insertCar(group_id, color_id, car_number);
        if (!car_id) {
            return res.status(500).json({
                success: false,
                message: 'fail to create car',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const removeCar = async (req, res) => {
    try {
        const { id } = req.body; // car_id

        let dep_bookings = []

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        let bookings = await selectRelatedBookingId(id, currentDate);
        for (var i in bookings) {
            let availableCarId = await selectAvailableCarId(
                bookings[i].start_date,
                bookings[i].end_date,
                bookings[i].car_group_id
            );
            let car_id;
            if (availableCarId.success) {
                car_id = availableCarId.data;
                let updateResult = await updateBookingCar(bookings[i].booking_id, car_id);
            } else {
                dep_bookings.push(bookings[i].booking_id);
            }
        }

        let deleteResult = await deleteCar(id);

        if (dep_bookings.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'warning: exist bookings with that car',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'successful',
        });  
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const editCar = async (req, res) => {
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
            cost,
        } = req.body;

        let group_id = await createCarGroup(
            brand,
            model,
            car_class,
            gearbox,
            creation_year,
            seats_number,
            fuel_consumption,
            cost,
            img_url
        );

        let color_id = await selectColorId(color);
        if (!color_id) {
            color_id = await insertColor(color);
        }

        let r = await updateCar(car_number, color_id, group_id, id);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getRentalList = async (req, res) => {
    try {
        let activeRent = await selectStateRentalList(state.paid);
        let badRent = await selectStateRentalList(state.bad);
        let goodRent = await selectStateRentalList(state.good);

        return res.status(200).json({
            success: true,
            message: 'successful',
            data: {
                active: activeRent,
                history: [goodRent, badRent],
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const estimateRent = async (req, res, state_value) => {
    try {
        const { id } = req.body; // rent_id

        let result = await updateRent(state_value, id);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getFines = async (req, res) => {
    try {
        let fines = await selectAllFines();
        console.log(fines)
        let result_data = [];

        for (var i in fines) {
            let car_info = await selectCarGroupInfo(fines[i].car_group_id);
            result_data.push(Object.assign(fines[i], car_info[0]));
        }

        return res.status(200).json({
            success: true,
            message: 'successful',
            data: result_data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const removeFine = async (req, res) => {
    try {
        const { id } = req.body; // fine_id
        let result = await deleteFines(id);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const addFine = async (req, res) => {
    try {
        const { rent_id, fine_cost, fine_date } = req.body;
        let fine_id = await insertFine(rent_id, fine_cost, fine_date);

        if (!fine_id) {
            return res.status(400).json({
                success: false,
                message: 'Fine before rent start',
            });
        }

        if (fine_id && fine_cost > 100.0) {
            let r = await updateRate(fine_id, -1);
        }
        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const editFine = async (req, res) => {
    try {
        const { rent_id, fine_cost, fine_date } = req.body;
        let result = await updateFine(rent_id, fine_cost, fine_date);

        return res.status(200).json({
            success: true,
            message: 'successful',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

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
    getCarInfo,
};
