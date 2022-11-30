import { selectRentalList } from "../services/index.js";


const getRentalList = async(req, res) => {
    const {client_id} = req.body;
    let rentList = await selectRentalList(client_id);
    return res.status(200).json({
        success: true,
        message: 'successful',
        data: rentList
    });
}

export {
    getRentalList,
}