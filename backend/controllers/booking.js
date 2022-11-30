import { selectBookingList } from "../services/index.js";


const getBookingList = async(req, res) => {
    const {client_id} = req.body;
    let bookingList = await selectBookingList(client_id);
    return res.status(200).json({
        success: true,
        message: 'successful',
        data: bookingList
    });
}

export {
    getBookingList,
}