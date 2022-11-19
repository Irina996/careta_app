import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import bcrypt from 'bcrypt'

dotenv.config();

const create_tables_sql = fs.readFileSync('./db/schema.sql').toString();
const init_data_sql = fs.readFileSync('./db/init_db.sql').toString();

const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const client = await pool.connect();

// create tables
console.log('Creating tables...')
await pool.query(create_tables_sql);

// add admin
if (process.env.ADMINMAIL && process.env.ADMINPASSWORD) {
    var admin = process.env.ADMINMAIL;
    var password = await bcrypt.hash(process.env.ADMINPASSWORD, 10);
    var user_id = 0;

    console.log('Adding admin...')

    await pool.query(
        'INSERT INTO public.User(email, user_password) VALUES ($1, $2) RETURNING user_id;', 
        [admin, password]
    ).then(result => {
        user_id = result.rows[0].user_id;
    });
    await pool.query('INSERT INTO public.Admin(user_id) VALUES ($1);', [user_id])
}

// add some data
console.log('Adding some required data...')
await pool.query(init_data_sql);

client.release();
pool.end();

console.log("Successfully ended");