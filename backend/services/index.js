import pool from '../config/db.js';
import {insertUser, selectUser, selectUserIdByEmail} from './user.js';
import {insertClient, selectClient, updateRate} from './client.js';
import { 
    selectCarGroup, 
    selectCarInfo, 
    selectAvailableCarId, 
    selectAllCarGroups, 
    selectCarGroupId,
    insertCarGroup,
    insertCar,
    selectAllCars,
    deleteCar,
    updateCar,
} from './car.js';
import { selectBookingList, insertBooking, updateBooking, selectBookingCost } from './booking.js';
import { selectRentalList, insertRent, selectStateRentalList, updateRent } from './rent.js';
import { selectFines, deleteFines, selectAllFines, insertFine, updateFine, selectFineCost } from './fine.js';
import { selectBrandId, insertBrand} from './car_brand.js';
import { selectModelId, insertModel } from './car_model.js';
import { selectClassId, insertClass } from './car_class.js';
import { selectColorId, insertColor } from './car_color.js';
import { selectAdmin } from './admin.js';


const db_query = async (query_text, params) => {
    try {
        let query_result;
        await pool
        .query(query_text, params)
        .then((result, error) => {
            if (error){
                // console.log(error);
            } else {
                // console.log(result);
                query_result = result.rows;
            }
        });
        return query_result;
    } catch(e) {
        console.error(e)
        return {};
    }
}

export {
    db_query,
    insertUser,
    selectUser,
    selectUserIdByEmail,
    insertClient,
    selectClient,
    selectCarGroup,
    selectCarInfo,
    selectBookingList,
    selectRentalList,
    selectAvailableCarId,
    insertBooking,
    updateBooking,
    insertRent,
    selectBookingCost,
    selectFines,
    deleteFines,
    selectAllCarGroups,
    selectCarGroupId,
    selectBrandId,
    insertBrand,
    selectModelId,
    insertModel,
    selectClassId,
    insertClass,
    selectColorId,
    insertColor,
    insertCarGroup,
    insertCar,
    selectAllCars,
    deleteCar,
    updateCar,
    selectStateRentalList,
    updateRent,
    selectAllFines,
    insertFine,
    updateFine,
    updateRate,
    selectAdmin,
    selectFineCost,
}