import { db_query } from "./index.js";

const insertClient = async(user_id, client_name, surname, phone, client_address) => {
    let query_text = 
        `INSERT INTO public.Client(user_id, client_name, 
                                   surname, phone, client_address) 
        VALUES ($1, $2, $3, $4, $5);`
    let query_params = [user_id, client_name, surname, phone, client_address];
    return await db_query(query_text, query_params)[0];
}

const selectClient = async(email, hashed_pswd) => {
    let query_text = 
        `SELECT Client.client_id, public.User.email, public.User.user_password,
            Client.client_name, Client.surname, Client.phone, Client.rate,
            Client.client_address
        FROM Client
          INNER JOIN public.User ON public.User.user_id = Client.user_id
        WHERE public.User.email=$1 AND public.User.user_password=$2;`;
    let query_params = [email, hashed_pswd];
    return await db_query(query_text, query_params)[0];
}

const updateRate = async(fine_id, rate_difference) => {
    let query_text = 
        `UPDATE Client 
        SET rate=rate+$2 
        WHERE client_id=
              (SELECT Booking.client_id 
               FROM Fine
                   INNER JOIN Booking ON Booking.car_id = Fine.car_id
               WHERE fine_id=$1
                 AND Fine.fine_date BETWEEN Booking.start_date AND Booking.end_date);`

    let query_params = [fine_id, rate_difference];

    return await db_query(query_text, query_params);
}

export { 
    insertClient,
    selectClient,
    updateRate,
};