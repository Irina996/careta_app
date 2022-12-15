import dotenv from 'dotenv';

dotenv.config();

let client_url = process.env.CLIENT_URL;
let server_url = process.env.SERVER_URL;

export { client_url, server_url };
