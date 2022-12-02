import { db_query } from "./index.js";

const selectRentalList = async(client_id) => {
    let query_text = 
        `SELECT Rent.rent_id, Car_brand.brand_name,
                Car_model.model_name, Car_class.class_name,
                Gearbox_type.type_name, Car_group.creation_year,
                Car_group.fuel_consumption, Car_group.seats_number,
                Car_group.image, Car_group.car_cost, Booking.booking_date,
                Booking.is_driver, Booking.baby_seat_amount, Rent.rent_state
        FROM Rent
            INNER JOIN Booking ON Rent.booking_id=Booking.booking_id
            INNER JOIN Car ON Car.car_id=Booking.car_id
            INNER JOIN Car_group ON Car_group.group_id=Car.car_group_id
            INNER JOIN Car_brand ON Car_group.car_brand_id=Car_brand.brand_id
            INNER JOIN Car_model ON Car_group.car_model_id=Car_model.model_id
            INNER JOIN Car_class ON Car_group.car_class_id=Car_class.class_id
            INNER JOIN Gearbox_type ON Gearbox_type.type_id=Car_group.gearbox_type_id
            INNER JOIN State ON Rent.rent_state=State.state_id
        WHERE client_id=$1;`;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    return result;
}

const insertRent = async(booking_id, rent_cost, rent_state) => {
    let query_text = 
        `INSERT INTO Rent(booking_id, rent_cost, rent_state) 
        VALUES ($1, $2, $3);`;
    let query_params = [booking_id, rent_cost, rent_state];
    let result = await db_query(query_text, query_params);
    return result;
}

export {
    selectRentalList,
    insertRent,
}