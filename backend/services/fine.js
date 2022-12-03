import { db_query } from "./index.js";

const selectFines = async(client_id) => {
    let query_text = 
        `SELECT fine_id, Car.car_group_id, Fine.fine_cost,
            Booking.baby_seat_amount, Booking.is_driver, 
            Rent.rent_cost
        FROM Fine
            INNER JOIN Booking ON Booking.car_id = Fine.car_id
            INNER JOIN Rent ON Rent.booking_id = Booking.booking_id
            INNER JOIN Car ON Car.car_id = Fine.car_id
        WHERE Booking.is_driver = false
          AND Fine.fine_date BETWEEN Booking.start_date AND Booking.end_date
          AND client_id=$1;`;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    return result;
}

const deleteFines = async(fine_id) => {
    let query_text = `DELETE FROM Fine WHERE fine_id=$1;`;
    let query_params = [fine_id];
    let result = await db_query(query_text, query_params);
    return result;
}

export {
    selectFines,
    deleteFines,
}