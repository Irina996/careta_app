import { db_query } from './index.js';

const selectBookingList = async (client_id) => {
    let query_text = 
        `SELECT Booking.booking_id, Car_brand.brand_name,
            Car_model.model_name, Car_class.class_name,
            Gearbox_type.type_name, Car_group.creation_year,
            Car_group.fuel_consumption, Car_group.seats_number,
            Car_group.image, Car_group.car_cost, Booking.booking_date,
            Booking.is_driver, Booking.baby_seat_amount
        FROM Booking
            INNER JOIN Car ON Car.car_id=Booking.car_id
            INNER JOIN Car_group ON Car_group.group_id=Car.car_group_id
            INNER JOIN Car_brand ON Car_group.car_brand_id=Car_brand.brand_id
            INNER JOIN Car_model ON Car_group.car_model_id=Car_model.model_id
            INNER JOIN Car_class ON Car_group.car_class_id=Car_class.class_id
            INNER JOIN Gearbox_type ON Gearbox_type.type_id=Car_group.gearbox_type_id
        WHERE client_id=$1 AND Booking.booking_state=1;`;
    let query_params = [client_id];

    // return approved client bookings
    let result = await db_query(query_text, query_params);
    return result;
};

const insertBooking = async (
    client_id,
    car_id,
    start_date,
    end_date,
    baby_seat_amount,
    is_driver,
    booking_date
) => {
    let query_text = 
        `INSERT INTO Booking(client_id, car_id, start_date,
                             end_date, baby_seat_amount, is_driver,
                             booking_date, booking_state)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 1);`;
    let query_params = [
        client_id,
        car_id,
        start_date,
        end_date,
        baby_seat_amount,
        is_driver,
        booking_date,
    ];

    let result = await db_query(query_text, query_params);
    return result;
};

const updateBookingState = async (booking_id, state_id) => {
    let query_text = `UPDATE Booking SET booking_state = $2 WHERE booking_id = $1;`;
    let query_params = [booking_id, state_id];

    let result = await db_query(query_text, query_params);
    return result;
};

const updateBookingCar = async (booking_id, car_id) => {
    let query_text = 'UPDATE Booking SET car_id=$2 WHERE booking_id=$1;';
    let query_params = [booking_id, car_id];

    let result = await db_query(query_text, query_params);
    return result;
}

// return booking cost(days * 24 hours * car cost)
const selectBookingCost = async (booking_id) => {
    let query_text = 
        `SELECT ROUND(CAST(
            Car_group.car_cost * (Booking.end_date - Booking.start_date)
                + 15 * CAST(Booking.is_driver AS INTEGER)
                + 10 * CAST((Booking.baby_seat_amount > 0) 
                    AS INTEGER) AS NUMERIC), 2)
            as booking_cost 
        FROM Booking
            INNER JOIN Car ON Car.car_id = Booking.car_id
            INNER JOIN Car_group ON Car_group.group_id = Car.car_group_id
        WHERE Booking.booking_id = $1;`;
    let query_params = [booking_id];

    let result = await db_query(query_text, query_params);
    return result[0].booking_cost;
};

const selectRelatedBookingId = async (car_id, date) => {
    try {
        let query_text = 
            `SELECT booking_id, start_date, end_date, Car.car_group_id 
            FROM Booking
                INNER JOIN Car ON Car.car_id=Booking.car_id
            WHERE 
                Booking.car_id=$1
                    AND (booking_state=2 AND end_date>$2)
               OR (booking_state=1 AND start_date>$2);`;
        let query_params = [car_id, date];
        let result = await db_query(query_text, query_params);
        return result;
    } catch (err) {
        console.log(err);
    }
};

export {
    selectBookingList,
    insertBooking,
    updateBookingState,
    selectBookingCost,
    updateBookingCar,
    selectRelatedBookingId,
};
