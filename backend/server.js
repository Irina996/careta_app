import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connect to db
dotenv.config();
const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
pool.connect().then(() => {

    console.log("Connected to DB");

}).catch((error) => {
    console.log(error.message);
});

// create port
const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log(`Server at: http://localhost:${port}`)
});