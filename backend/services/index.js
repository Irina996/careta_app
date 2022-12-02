import pool from '../config/db.js';
import {insertUser, selectUser, selectUserIdByEmail} from './user.js';
import {insertClient, selectClient} from './client.js';
import { selectCarGroup, selectCarInfo, selectAvailableCarId } from './car.js';
import { selectBookingList, insertBooking, updateBooking, selectBookingCost } from './booking.js';
import { selectRentalList, insertRent } from './rent.js';


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
}