import { db_query } from "./index.js";

const selectCarGroup = async(
        brand, 
        model, 
        class_name, 
        gearbox_type, 
        year_start, 
        year_finish, 
        seats_number,
        offset_number,
        rows_count,
        start_date,
        end_date
    )=> {
    let query_text = 
        `SELECT Car_group.group_id, Car_brand.brand_name,
                Car_model.model_name, Car_group.image, 
                Car_group.car_cost
        FROM Car_group
        INNER JOIN Car_brand ON Car_group.car_brand_id=Car_brand.brand_id
        INNER JOIN Car_model ON Car_group.car_model_id=Car_model.model_id
        INNER JOIN Car_class ON Car_group.car_class_id=Car_class.class_id
        INNER JOIN Gearbox_type ON Gearbox_type.type_id=Car_group.gearbox_type_id
        INNER JOIN Car ON Car.car_group_id=Car_group.group_id
        LEFT JOIN
        (SELECT car_id FROM Booking
                       WHERE
                           (Booking.start_date >= $10 AND Booking.start_date <= $11)
                          OR (Booking.start_date <= $10 AND Booking.end_date >= $10)
                       GROUP BY car_id) Bookings ON Bookings.car_id = Car.car_id
        WHERE Car_brand.brand_name LIKE $1
          AND Car_model.model_name LIKE $2
          AND Car_class.class_name LIKE $3
          AND Gearbox_type.type_name LIKE $4
          AND Car_group.creation_year BETWEEN $5 AND $6
          AND Car_group.seats_number=$7
        GROUP BY Car_group.group_id, Car_brand.brand_name,
          Car_model.model_name, Car_group.image,
          Car_group.car_cost
        HAVING COUNT(Bookings.car_id) < COUNT(Car.car_id)
        OFFSET $8
        FETCH NEXT $9 ROWS ONLY;`;
    let query_params = ['%' + brand + '%', 
                        '%' + model + '%', 
                        '%' + class_name + '%',
                        '%' + gearbox_type + '%',
                        year_start, year_finish,
                        seats_number,
                        offset_number,
                        rows_count,
                        start_date,
                        end_date
                    ];
    let result = await db_query(query_text, query_params);
    //console.log(result);
    return result;
}

const selectCarInfo = async(group_id)=> {
    let query_text = 
        `SELECT Car_group.group_id, Car_brand.brand_name,
                Car_model.model_name, Car_class.class_name,
                Gearbox_type.type_name, Car_group.creation_year,
                Car_group.fuel_consumption, Car_group.seats_number,
                Car_group.image, Car_group.car_cost
        FROM Car_group
            INNER JOIN Car_brand ON car_brand_id=brand_id
            INNER JOIN Car_model ON car_model_id=model_id
            INNER JOIN Car_class ON car_class_id=class_id
            INNER JOIN Gearbox_type ON type_id=gearbox_type_id
        WHERE Car_group.group_id=$1`;
    let query_params = [group_id];
    let result = await db_query(query_text, query_params);
    //console.log(result);
    return result;
}

const selectAvailableCarId = async(start_date, end_date, group_id)=> {
    let query_text = 
        `SELECT Car.car_id FROM Car
        LEFT JOIN
            (SELECT car_id FROM Booking
                           WHERE
                               (Booking.start_date >= $1 AND Booking.start_date <= $2)
                              OR (Booking.start_date <= $1 AND Booking.end_date >= $1)
                           GROUP BY car_id) Bookings ON Bookings.car_id = Car.car_id
        WHERE Bookings.car_id IS NULL AND Car.car_group_id=$3
        LIMIT 1;`;
    let query_params = [start_date, end_date, group_id];
    let result = await db_query(query_text, query_params);
    try {
        return {
            success: true,
            data: result[0].car_id
        }
    } catch(error) {
        return {
            success: false
        }
    }
}

export { 
    selectCarGroup,
    selectCarInfo,
    selectAvailableCarId,
};