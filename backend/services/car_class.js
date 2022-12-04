import { db_query } from "./index.js";

const selectClassId = async(car_class)=> {
    try {
        let query_text = `SELECT class_id FROM Car_class WHERE class_name=$1;`;
        let query_params = [car_class];
        let result = await db_query(query_text, query_params);
        return result[0].class_id;
    } catch(err) {
        return undefined;
    }
}

const insertClass = async(car_class)=> {
    try {
        let query_text = `INSERT INTO Car_class(class_name) VALUES ($1) RETURNING class_id;`;
        let query_params = [car_class];
        let result = await db_query(query_text, query_params);
        return result[0].class_id;
    } catch(err) {
        return undefined;
    }
}

export {
    selectClassId, 
    insertClass,
}