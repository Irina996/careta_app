import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import pg from 'pg';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import RandExp from 'randexp';

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
    api_secret: process.env.CLOUDINARYAPISECRET,
});

console.log('Adding car brands...');
var brand_array = fs
    .readFileSync('./db/seed_data/brand.txt')
    .toString()
    .split('\n');
for (i in brand_array) {
    await pool.query('INSERT INTO Car_brand(brand_name) VALUES ($1);', [
        brand_array[i],
    ]);
}

console.log('Adding car models...');
var model_array = fs
    .readFileSync('./db/seed_data/model.txt')
    .toString()
    .split('\n');
for (i in model_array) {
    await pool.query('INSERT INTO Car_model(model_name) VALUES ($1);', [
        model_array[i],
    ]);
}

var img_paths = fs.readdirSync('./db/seed_data/images/');
img_paths.sort(function (a, b) {
    return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
    });
});

console.log('Adding car groups...');
let car_groups_length = 0;
var data_array = fs
    .readFileSync('./db/seed_data/group.txt')
    .toString()
    .split('\n');
for (var i = 0; i < data_array.length; i++) {
    car_groups_length = car_groups_length + 1;
    var img;
    await cloudinary.uploader
        .upload('./db/seed_data/images/' + img_paths[i])
        .then((result) => {
            img = result.url;
        });

    var seed_data = data_array[i].split(',');
    await pool.query(
        `INSERT INTO Car_group(car_brand_id, 
                               car_model_id, 
                               car_class_id, 
                               gearbox_type_id, 
                               creation_year, 
                               fuel_consumption, 
                               seats_number, 
                               image, 
                               car_cost) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
            seed_data[0],
            seed_data[1],
            seed_data[2],
            seed_data[3],
            seed_data[4],
            seed_data[5],
            seed_data[6],
            img,
            seed_data[7],
        ]
    );
}

console.log('Adding colors...');
let color_length = 0;
for (var i = 0; i < 5; i++) {
    color_length = color_length + 1;
    await pool.query(`INSERT INTO Color(color_name) VALUES ($1);`, [
        faker.vehicle.color(),
    ]);
}

console.log('Adding cars');
const vid = new RandExp(/\d\d\d\d [A-Z][A-Z]-[1-7]/);
for (var i = 0; i < 35; i++) {
    await pool.query(
        `INSERT INTO Car(car_group_id, color_id, car_number) 
         VALUES ($1, $2, $3);`,
        [
            Math.floor(Math.random() * car_groups_length) + 1,
            Math.floor(Math.random() * color_length) + 1,
            vid.gen(),
        ]
    );
}

pool.end();
console.log('Successfully ended');
