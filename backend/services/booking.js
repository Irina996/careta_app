import { db_query } from "./index.js";

const selectBookingList = async(client_id) => {
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
        WHERE client_id=$1;`;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    //console.log(result);
    return result;
}

export {
    selectBookingList,
}