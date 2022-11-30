import { db_query } from "./index.js";

const selectCarGroup = async(
    brand, 
    model, 
    class_name, 
    gearbox_type, 
    year_start, 
    year_finish, 
    seats_number
    )=> {
    let query_text = 
        `SELECT Car_group.group_id, Car_brand.brand_name,
                Car_model.model_name, Car_group.image, 
                Car_group.car_cost
        FROM Car_group
            INNER JOIN Car_brand ON car_brand_id=brand_id
            INNER JOIN Car_model ON car_model_id=model_id
            INNER JOIN Car_class ON car_class_id=class_id
            INNER JOIN Gearbox_type ON type_id=gearbox_type_id
        WHERE Car_brand.brand_name LIKE $1
        AND Car_model.model_name LIKE $2
        AND Car_class.class_name LIKE $3
        AND Gearbox_type.type_name LIKE $4
        AND Car_group.creation_year BETWEEN $5 AND $6
        AND Car_group.seats_number=$7;`;
    let query_params = ['%' + brand + '%', 
                        '%' + model + '%', 
                        '%' + class_name + '%',
                        '%' + gearbox_type + '%',
                        year_start, year_finish,
                        seats_number];
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

export { 
    selectCarGroup,
    selectCarInfo,
};