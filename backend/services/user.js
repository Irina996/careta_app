import {db_query} from './index.js';

// return inserted id
const insertUser = async(email, hashed_pswd) => {
    let query_text = `INSERT INTO public.User(email, user_password) 
                            VALUES ($1, $2) 
                            RETURNING user_id;`
    let query_params = [email, hashed_pswd];
    let result = await db_query(query_text, query_params);
    return result[0].user_id
};

const selectUserIdByEmail = async(email) => {
    let query_text = 
        `SELECT public.User.user_id
         FROM public.User
         WHERE public.User.email=$1;`;
    let query_params = [email];
    let result = await db_query(query_text, query_params);
    return result[0];
}

const selectUser = async(email) => {
    let query_text = 
        `SELECT *
         FROM public.User
         WHERE email=$1;`;
    let query_params = [email];
    let result = await db_query(query_text, query_params);  
    return result[0];
}

export { 
    insertUser,
    selectUser,
    selectUserIdByEmail,
}