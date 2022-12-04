import { db_query } from "./index.js";

const selectModelId = async(model)=> {
    try {
        let query_text = `SELECT model_id FROM Car_model WHERE model_name=$1;`;
        let query_params = [model];
        let result = await db_query(query_text, query_params);
        return result[0].model_id;
    } catch(err) {
        return undefined;
    }
}

const insertModel = async(model)=> {
    try {
        let query_text = `INSERT INTO Car_model(model_name) VALUES ($1) RETURNING model_id;`;
        let query_params = [model];
        let result = await db_query(query_text, query_params);
        return result[0].model_id;
    } catch(err) {
        return undefined;
    }
}

export {
    selectModelId, 
    insertModel,
}