import express from 'express'
import pool from './config/db.js';

import userRouter from './routes/user.js';
import clientRouter from './routes/client.js';
import mainRouter from './routes/home.js';
import bookingRouter from './routes/booking.js';
import rentalRouter from './routes/rent.js';
import fineRouter from './routes/fine.js';
import fileUpload from 'express-fileupload';
import adminRouter from './routes/admin.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cors({
    origin: '*'
}))

app.use('/user/', userRouter);
app.use('/client/', clientRouter);
app.use('/home', mainRouter);
app.use('/booking', bookingRouter);
app.use('/rent', rentalRouter);
app.use('/fines/', fineRouter);
app.use('/admin/', adminRouter);

// create port
const port = process.env.PORT || 5000;
// connect to db
pool.connect().then(() => {
    console.log("Connected to DB");

    app.listen(port, async () => {
        console.log(`Server at: http://localhost:${port}`);

        

    });

}).catch((error) => {
    console.log(error);
    console.log(error.message);
});