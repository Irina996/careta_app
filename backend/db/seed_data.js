import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import pg from 'pg'
import fs from 'fs'

dotenv.config();

const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARYNAME, 
    api_key: process.env.CLOUDINARYAPIKEY, 
    api_secret: process.env.CLOUDINARYAPISECRET 
});

console.log('adding car brands...')
var brand_array = fs.readFileSync('./db/seed_data/brand.txt').toString().split('\n');
for (i in brand_array) {
    await pool.query('INSERT INTO Car_brand(brand_name) VALUES ($1);', [i])
}

console.log('adding car models...')
var model_array = fs.readFileSync('./db/seed_data/model.txt').toString().split('\n');
for (i in model_array) {
    await pool.query('INSERT INTO Car_model(model_name) VALUES ($1);', [i])
}

var img_paths = fs.readdirSync('./db/seed_data/images/');
img_paths.sort(function(a, b) {
    return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
});

console.log('adding car groups...')
var data_array = fs.readFileSync('./db/seed_data/group.txt').toString().split("\n");
for (var i=0; i < data_array.length; i++) {
    var img;
    await cloudinary.uploader
    .upload("./db/seed_data/images/" + img_paths[i])
    .then(result=>{
        img = result.url;
    });

    var seed_data = data_array[i].split(',');
    await pool.query(`INSERT INTO Car_group(car_brand_id, 
                                            car_model_id, 
                                            car_class_id, 
                                            gearbox_type_id, 
                                            creation_year, 
                                            fuel_consumption, 
                                            seats_number, 
                                            image, 
                                            car_cost) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, 
                    [seed_data[0], seed_data[1], seed_data[2], 
                    seed_data[3], seed_data[4], seed_data[5], 
                    seed_data[6], img, seed_data[7]]);
}
pool.end();
console.log("Successfully ended")