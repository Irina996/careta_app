import { db_query } from "./index.js";

const fun = async() => {
    try{
        let query_text = ``;
        let query_params = [];
        let result = await db_query(query_text, query_params);
        return result;
    } catch(err) {
        return undefined;
    }
}

export {
    
};