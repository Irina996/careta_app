import { deleteFines, selectCarInfo, selectFineCost, selectFines } from "../services/index.js"


const getFines = async(req, res) => {
    try{
        const {id} = req.query; // client_id

        let fines = await selectFines(id);
        let result_data = [];

        for (var i in fines){
            let car_info = await selectCarInfo(fines[i].car_group_id);
            result_data.push(Object.assign(fines[i], car_info[0]));
        }

        return res.status(200).json({
            success: true,
            message: 'successful',
            data: result_data
        });
    } catch(e) {
        return res.status(406).json({
            success: false,
            message: 'fail'
        })
    }
}

const payFine = async(req, res) => {
    try{
        const {id} = req.body; // fine_id

        let result = await deleteFines(id);
        //console.log(result);

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

export { 
    getFines,
    payFine,
}