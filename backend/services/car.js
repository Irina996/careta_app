import { db_query } from './index.js';

const selectCarGroup = async (
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
) => {
    let query_params = [
        '%' + brand + '%',
        '%' + model + '%',
        '%' + class_name + '%',
        '%' + gearbox_type + '%',
        year_start,
        year_finish,
        offset_number,
        rows_count,
        start_date,
        end_date,
    ];
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
                           (Booking.start_date >= $9 AND Booking.start_date <= $10)
                          OR (Booking.start_date <= $9 AND Booking.end_date >= $9)
                       GROUP BY car_id) Bookings ON Bookings.car_id = Car.car_id
        WHERE Car.is_deleted=false
          AND Car_brand.brand_name LIKE $1
          AND Car_model.model_name LIKE $2
          AND Car_class.class_name LIKE $3
          AND Gearbox_type.type_name LIKE $4
          AND Car_group.creation_year BETWEEN $5 AND $6`;
    if (seats_number != '') {
        query_text = query_text + `AND Car_group.seats_number=$11`;
        query_params.push(seats_number);
    }
    query_text =
        query_text +
        `GROUP BY Car_group.group_id, Car_brand.brand_name,
          Car_model.model_name, Car_group.image,
          Car_group.car_cost
        HAVING COUNT(Bookings.car_id) < COUNT(Car.car_id)
        OFFSET $7
        FETCH NEXT $8 ROWS ONLY;`;

    let result = await db_query(query_text, query_params);
    //console.log(result);
    return result;
};

const selectCarGroupInfo = async (group_id) => {
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
};

const selectCarInfo = async (car_id) => {
    let query_text = 
        `SELECT Car.car_id, Car_brand.brand_name,
                Car_model.model_name, Car_class.class_name,
                Gearbox_type.type_name, Car_group.creation_year,
                Car_group.fuel_consumption, Car_group.seats_number,
                Car_group.image, Car_group.car_cost, 
                Car.car_number, Color.color_name
        FROM Car
            INNER JOIN Car_group ON car_group_id=group_id
            INNER JOIN Car_brand ON car_brand_id=brand_id
            INNER JOIN Car_model ON car_model_id=model_id
            INNER JOIN Car_class ON car_class_id=class_id
            INNER JOIN Gearbox_type ON type_id=gearbox_type_id
            INNER JOIN Color ON Car.color_id=Color.color_id
        WHERE Car.car_id=$1`;
    let query_params = [car_id];
    let result = await db_query(query_text, query_params);
    //console.log(result);
    try {
        return result[0];
    } catch(err) {
        return {};
    }
};

const selectAvailableCarId = async (start_date, end_date, group_id) => {
    let query_text = 
        `SELECT Car.car_id FROM Car
        LEFT JOIN
            (SELECT car_id FROM Booking
                           WHERE
                               (Booking.start_date >= $1 AND Booking.start_date <= $2)
                              OR (Booking.start_date <= $1 AND Booking.end_date >= $1)
                           GROUP BY car_id) Bookings ON Bookings.car_id = Car.car_id
        WHERE Car.is_deleted=false AND Bookings.car_id IS NULL AND Car.car_group_id=$3
        LIMIT 1;`;
    let query_params = [start_date, end_date, group_id];
    let result = await db_query(query_text, query_params);
    try {
        return {
            success: true,
            data: result[0].car_id,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

const selectAllCarGroups = async (offset_number, rows_count) => {
    let query_text = 
        `SELECT Car_group.group_id, Car_brand.brand_name,
            Car_model.model_name, Car_group.image,
            Car_group.car_cost
        FROM Car_group
            INNER JOIN Car_brand ON car_brand_id=brand_id
            INNER JOIN Car_model ON car_model_id=model_id
        OFFSET $1
        FETCH NEXT $2 ROWS ONLY;`;
    let query_params = [offset_number, rows_count];
    let result = await db_query(query_text, query_params);
    return result;
};

const selectAllCars = async (offset_number, rows_count) => {
    let query_text = 
        `SELECT Car.car_id, Car_brand.brand_name,
                Car_model.model_name, Car_group.image,
                Car_group.car_cost, Car.car_number
        FROM Car
            INNER JOIN Car_group ON Car.car_group_id=Car_group.group_id
            INNER JOIN Car_brand ON Car_group.car_brand_id=Car_brand.brand_id
            INNER JOIN Car_model ON Car_group.car_model_id=Car_model.model_id
        WHERE Car.is_deleted=false
        OFFSET $1 FETCH NEXT $2 ROWS ONLY;`;
    let query_params = [offset_number, rows_count];
    let result = await db_query(query_text, query_params);
    return result;
};

const selectCarGroupId = async (
    brand,
    model,
    car_class,
    gearbox,
    creation_year,
    seats_number,
    fuel_consumption,
    cost
) => {
    let query_text = 
        `SELECT Car_group.group_id
        FROM Car_group
            INNER JOIN Car_brand ON car_brand_id=brand_id
            INNER JOIN Car_model ON car_model_id=model_id
            INNER JOIN Car_class ON car_class_id=class_id
            INNER JOIN Gearbox_type ON type_id=gearbox_type_id
        WHERE Car_brand.brand_name=$1
          AND Car_model.model_name=$2
          AND Car_class.class_name=$3
          AND Gearbox_type.type_name=$4
          AND creation_year=$5
          AND seats_number=$6
          AND Car_group.fuel_consumption=$7
          AND car_cost=$8;`;
    let query_params = [
        brand,
        model,
        car_class,
        gearbox,
        creation_year,
        seats_number,
        fuel_consumption,
        cost,
    ];
    try {
        let result = await db_query(query_text, query_params);
        return result[0].group_id;
    } catch (e) {
        return undefined;
    }
};

const insertCarGroup = async (
    brand_id,
    model_id,
    class_id,
    gearbox,
    year,
    fuel_consumption,
    seats_number,
    image,
    car_cost
) => {
    try {
        let query_text = 
            `INSERT INTO Car_group(car_brand_id, car_model_id, 
                                car_class_id, gearbox_type_id, 
                                creation_year, fuel_consumption,
                                seats_number, image, car_cost)
            VALUES ($1, $2, $3, 
                    (SELECT type_id FROM Gearbox_type WHERE type_name=$4), 
                    $5, $6, $7, $8, $9)
            RETURNING group_id;`;
        let query_params = [
            brand_id,
            model_id,
            class_id,
            gearbox,
            year,
            fuel_consumption,
            seats_number,
            image,
            car_cost,
        ];
        let result = await db_query(query_text, query_params);
        return result[0].group_id;
    } catch (err) {
        return undefined;
    }
};

const insertCar = async (group_id, color_id, car_number) => {
    try {
        let query_text = 
            `INSERT INTO Car(car_group_id, color_id, car_number) 
            VALUES ($1, $2, $3)
            RETURNING car_id;`;
        let query_params = [group_id, color_id, car_number];
        let result = await db_query(query_text, query_params);
        return result[0].car_id;
    } catch (err) {
        return undefined;
    }
};

const deleteCar = async (car_id) => {
    try {
        let query_text = `UPDATE Car SET is_deleted=true WHERE car_id=$1;`;
        let query_params = [car_id];
        let result = await db_query(query_text, query_params);
        return result;
    } catch (err) {
        return undefined;
    }
};

const updateCar = async (car_number, color_id, group_id, car_id) => {
    try {
        let query_text = `UPDATE Car
            SET car_number=$1, color_id=$2, car_group_id=$3
            WHERE car_id=$4;`;
        let query_params = [car_number, color_id, group_id, car_id];
        let result = await db_query(query_text, query_params);
        return result;
    } catch (err) {
        return undefined;
    }
};

const deleteCarGroup = async (group_id) => {
    try {
        let query_text = `DELETE FROM Car_group WHERE group_id=$1;`;
        let query_params = [group_id];
        let result = await db_query(query_text, query_params);
        return result;
    } catch (err) {
        return undefined;
    }
};

const getEmptyCarGroupIds = async () => {
    try {
        let query_text = `SELECT group_id
            FROM Car_group
            LEFT JOIN Car ON Car.car_group_id=Car_group.group_id
            WHERE Car.car_id IS NULL;`;
        let query_params = [];
        let result = await db_query(query_text, query_params);
        return result;
    } catch (err) {
        return undefined;
    }
};

export {
    selectCarGroup,
    selectCarGroupInfo,
    selectAvailableCarId,
    selectAllCarGroups,
    selectCarGroupId,
    insertCarGroup,
    insertCar,
    selectAllCars,
    deleteCar,
    updateCar,
    selectCarInfo,
};
