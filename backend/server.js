const express = require("express")
const dotenv = require("dotenv")
const pg = require("pg")
const bcrypt = require("bcrypt")

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
    const hashedPassword = await bcrypt.hash("admin_password", 10);
    console.log(hashedPassword)
});