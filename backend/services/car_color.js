import { db_query } from './index.js';

const selectColorId = async (color) => {
    try {
        let query_text = `SELECT color_id FROM Color WHERE color_name=$1;`;
        let query_params = [color];
        let result = await db_query(query_text, query_params);
        return result[0].color_id;
    } catch (err) {
        return undefined;
    }
};

const insertColor = async (color) => {
    try {
        let query_text = `INSERT INTO Color(color_name) VALUES ($1) RETURNING color_id;`;
        let query_params = [color];
        let result = await db_query(query_text, query_params);
        return result[0].color_id;
    } catch (err) {
        return undefined;
    }
};

export { selectColorId, insertColor };
