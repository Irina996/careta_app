import { db_query } from './index.js';

const selectFines = async (client_id) => {
    let query_text = 
        `SELECT fine_id,
               Car.car_group_id,
               Booking.baby_seat_amount,
               Booking.is_driver,
               Rent.rent_cost,
               Client.client_name,
               Client.surname,
               public.User.email,
               fine_cost,
               Booking.car_id
        FROM Fine
                 INNER JOIN Rent ON Rent.rent_id = Fine.rent_id
                 INNER JOIN Booking ON Booking.booking_id = Rent.booking_id
                 INNER JOIN Car ON Car.car_id = Booking.car_id
                 INNER JOIN Client ON Client.client_id = Booking.client_id
                 INNER JOIN public.User ON public.User.user_id = Client.user_id
        WHERE Fine.is_deleted = false
          AND Client.client_id = $1;
        `;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    return result;
};

const deleteFines = async (fine_id) => {
    let query_text = `UPDATE Fine SET is_deleted=true WHERE fine_id=$1;`;
    let query_params = [fine_id];
    let result = await db_query(query_text, query_params);
    return result;
};

const selectAllFines = async () => {
    let query_text = 
        `SELECT fine_id,
               Car.car_group_id,
               Booking.baby_seat_amount,
               Booking.is_driver,
               Rent.rent_cost,
               Client.client_name,
               Client.surname,
               public.User.email,
               fine_cost,
               Booking.car_id,
               Rent.rent_id
        FROM Fine
                 INNER JOIN Rent ON Rent.rent_id = Fine.rent_id
                 INNER JOIN Booking ON Booking.booking_id = Rent.booking_id
                 INNER JOIN Car ON Car.car_id = Booking.car_id
                 INNER JOIN Client ON Client.client_id = Booking.client_id
                 INNER JOIN public.User ON public.User.user_id = Client.user_id
        WHERE Fine.is_deleted = false;`;
    let query_params = [];

    let result = await db_query(query_text, query_params);
    return result;
};

const insertFine = async (rent_id, fine_cost, fine_date) => {
    let query_text = 
        `INSERT INTO Fine(rent_id, fine_cost, fine_date)
        SELECT $1, $2, $3
        FROM Rent
                 INNER JOIN Booking ON Rent.booking_id = Booking.booking_id
        WHERE rent_id = $1
          AND start_date <= $3
        RETURNING fine_id;`;
    let query_params = [rent_id, fine_cost, fine_date];
    let result = await db_query(query_text, query_params);
    try {
        return result[0].fine_id;
    } catch (err) {
        return undefined;
    }
};

const updateFine = async (rent_id, fine_cost) => {
    let query_text = `UPDATE Fine SET fine_cost=$2 WHERE rent_id=$1;`;
    let query_params = [rent_id, fine_cost];
    let result = await db_query(query_text, query_params);
    return result;
};

const selectFineCost = async (fine_id) => {
    let query_text = `SELECT fine_cost FROM Fine WHERE fine_id=$1;`;
    let query_params = [fine_id];
    let result = await db_query(query_text, query_params);
    try {
        return result[0].fine_cost;
    } catch (err) {
        return 0;
    }
};

export {
    selectFines,
    deleteFines,
    selectAllFines,
    insertFine,
    updateFine,
    selectFineCost,
};
