import { insertBooking, insertRent, selectAvailableCarId, selectBookingCost, selectBookingList, updateBooking } from "../services/index.js";
import state from "../config/state_code.js";

const getBookingList = async(req, res) => {
    try{
        const {id} = req.query; // client_id
        let bookingList = await selectBookingList(id);
        return res.status(200).json({
            success: true,
            message: 'successful',
            data: bookingList
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: true,
            message: 'fail'
        });
    }
}

const createBooking = async(req, res) => {
    try{
        const {
            client_id, 
            car_group_id,
            start_date, 
            end_date, 
            baby_seat_amount, 
            is_driver
        } = req.body;

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        let result = await selectAvailableCarId(start_date, end_date, car_group_id);
        let car_id;
        if (result.success) {
            car_id = result.data;
        } else{
            return res.status(406).json({
                success: false,
                message: 'cannot get car'
            });
        }

        result = await insertBooking(client_id, car_id, start_date, 
            end_date, baby_seat_amount, is_driver, currentDate);

        console.log(car_id);
        console.log(result);

        return res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'fail'
        });
    }
}

const cancelBooking = async(req, res) => {
    try{
        const {id} = req.body; //booking_id

        let result = await updateBooking(id, state.canceled);

        res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        consolelog(err);
        res.status(500).json({
            success: false,
            message: 'fail'
        });
    }
}

const payBooking = async(req, res) => {
    try{
        const booking_id = req.body.id; //booking_id

        await updateBooking(booking_id, state.paid);
        await insertRent(booking_id, rent_cost, state.paid);

        res.status(200).json({
            success: true,
            message: 'successful'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'fail'
        });
    }
}

export {
    getBookingList,
    createBooking,
    cancelBooking,
    payBooking,
}