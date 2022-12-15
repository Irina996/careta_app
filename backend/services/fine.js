import { db_query } from './index.js';

const selectFines = async (client_id) => {
    let query_text = 
        `SELECT fine_id, Car.car_group_id, Fine.fine_cost,
            Booking.baby_seat_amount, Booking.is_driver, 
            Rent.rent_cost, Client.client_name, Client.surname,
            public.User.email, fine_cost, Fine.car_id
        FROM Fine
            INNER JOIN Booking ON Booking.car_id = Fine.car_id
            INNER JOIN Rent ON Rent.booking_id = Booking.booking_id
            INNER JOIN Car ON Car.car_id = Fine.car_id
            INNER JOIN Client ON Client.client_id=Booking.client_id
            INNER JOIN public.User ON public.User.user_id=Client.user_id
        WHERE Booking.is_driver = false
          AND Fine.fine_date BETWEEN Booking.start_date AND Booking.end_date
          AND Client.client_id=$1;`;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    return result;
};

const deleteFines = async (fine_id) => {
    let query_text = `DELETE FROM Fine WHERE fine_id=$1;`;
    let query_params = [fine_id];
    let result = await db_query(query_text, query_params);
    return result;
};

const selectAllFines = async () => {
    let query_text = 
        `SELECT fine_id, Car.car_group_id, Fine.fine_cost,
                Booking.baby_seat_amount, Booking.is_driver,
                Rent.rent_cost, Client.client_name, Client.surname,
                public.User.email, fine_cost, Fine.car_id
        FROM Fine
            INNER JOIN Booking ON Booking.car_id = Fine.car_id
            INNER JOIN Rent ON Rent.booking_id = Booking.booking_id
            INNER JOIN Car ON Car.car_id = Fine.car_id
            INNER JOIN Client ON Client.client_id=Booking.client_id
            INNER JOIN public.User ON public.User.user_id=Client.user_id
        WHERE Booking.is_driver = false
        AND Fine.fine_date BETWEEN Booking.start_date AND Booking.end_date;`;
    let query_params = [];

    let result = await db_query(query_text, query_params);
    return result;
};

const insertFine = async (car_id, fine_cost, fine_date) => {
    let query_text = `INSERT INTO Fine(car_id, fine_cost, fine_date) 
         VALUES ($1, $2, $3) RETURNING fine_id;`;
    let query_params = [car_id, fine_cost, fine_date];
    let result = await db_query(query_text, query_params);
    try {
        return result[0].fine_id;
    } catch (err) {
        return undefined;
    }
};

const updateFine = async (car_id, fine_cost, fine_date) => {
    let query_text = `UPDATE Fine SET fine_cost=$2, fine_date=$3
         WHERE car_id=$1;`;
    let query_params = [car_id, fine_cost, fine_date];
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
