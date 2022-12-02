import { selectRentalList } from "../services/index.js";


const getRentalList = async(req, res) => {
    const {id} = req.body; // client_id
    let rentList = await selectRentalList(id);
    return res.status(200).json({
        success: true,
        message: 'successful',
        data: rentList
    });
}

export {
    getRentalList,
}