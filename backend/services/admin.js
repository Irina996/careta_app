import { db_query } from "./index.js";

const selectAdmin = async(user_id) => {
    try{
        let query_text = `SELECT admin_id FROM admin WHERE user_id=$1;`;
        let query_params = [user_id];
        let result = await db_query(query_text, query_params);
        return result[0];
    } catch(err) {
        return undefined;
    }
}

export {
    selectAdmin,
};