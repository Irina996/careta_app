import { db_query } from './index.js';

const insertClient = async (
    user_id,
    client_name,
    surname,
    phone,
    client_address
) => {
    let query_text = `INSERT INTO public.Client(user_id, client_name, 
                                   surname, phone, client_address) 
        VALUES ($1, $2, $3, $4, $5);`;
    let query_params = [user_id, client_name, surname, phone, client_address];
    try {
        let result = await db_query(query_text, query_params);
        return result[0];
    } catch (err) {
        return undefined;
    }
};

const selectClient = async (user_id) => {
    let query_text = `SELECT client_id FROM Client WHERE user_id=$1;`;
    let query_params = [user_id];
    try {
        let result = await db_query(query_text, query_params);
        return result[0].client_id;
    } catch (err) {
        return undefined;
    }
};

const updateRate = async (fine_id, rate_difference) => {
    let query_text = `UPDATE Client 
        SET rate=rate+$2 
        WHERE client_id=
              (SELECT Booking.client_id 
               FROM Fine
                   INNER JOIN Booking ON Booking.car_id = Fine.car_id
               WHERE fine_id=$1
                 AND Fine.fine_date BETWEEN Booking.start_date AND Booking.end_date);`;

    let query_params = [fine_id, rate_difference];

    return await db_query(query_text, query_params);
};

const insertCreditData = async (
    client_id,
    card_number,
    card_holder,
    exp_date,
    cvv
) => {
    let query_text = 
        `INSERT INTO Credit_card (client_id, card_number, card_holder, exp_date, CVV)
        VALUES($1, $2, $3, $4, $5) 
        ON CONFLICT(client_id) DO UPDATE 
            SET card_number=$2, card_holder=$3, exp_date=$4, CVV=$5;`;
    let query_params = [client_id, card_number, card_holder, exp_date, cvv];
    console.log(query_params);

    let result = await db_query(query_text, query_params);
    return result;
};

const selectCreditData = async (client_id) => {
    let query_text = `SELECT * FROM Credit_card WHERE client_id=$1;`;
    let query_params = [client_id];

    let result = await db_query(query_text, query_params);
    return result[0];
};

export {
    insertClient,
    selectClient,
    updateRate,
    insertCreditData,
    selectCreditData,
};
