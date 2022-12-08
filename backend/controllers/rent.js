import { selectRentalList } from "../services/index.js";


const getRentalList = async(req, res) => {
    try{
        const {id} = req.query; // client_id
        let rentList = await selectRentalList(id);
        return res.status(200).json({
            success: true,
            message: 'successful',
            data: rentList
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'fail'
        })
    }
}

export {
    getRentalList,
}