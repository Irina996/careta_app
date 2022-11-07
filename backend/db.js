const pg = require('pg');
const dotenv = require('dotenv');
var fs = require('fs');

const sql = fs.readFileSync('schema.sql').toString();
dotenv.config();
const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.connect();
pool.query(sql);
pool.end();

console.log("DATABASE INITIALIZED")