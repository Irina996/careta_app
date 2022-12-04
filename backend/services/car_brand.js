import { db_query } from "./index.js";

const selectBrandId = async(brand)=> {
    try {
        let query_text = `SELECT brand_id FROM Car_brand WHERE brand_name=$1;`;
        let query_params = [brand];
        let result = await db_query(query_text, query_params);
        return result[0].brand_id;
    } catch(err) {
        return undefined;
    }
}

const insertBrand = async(brand)=> {
    try {
        let query_text = `INSERT INTO Car_brand(brand_name) VALUES ($1) RETURNING brand_id;`;
        let query_params = [brand];
        let result = await db_query(query_text, query_params);
        return result[0].brand_id;
    } catch(err) {
        return undefined;
    }
}

export {
    selectBrandId, 
    insertBrand
}