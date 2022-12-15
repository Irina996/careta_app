import {
    deleteFines,
    selectCarGroupInfo,
    selectFines,
} from '../services/index.js';

const getFines = async (req, res) => {
    try {
        const { client_id } = req.query;

        let fines = await selectFines(client_id);
        let result_data = [];

        for (var i in fines) {
            let car_info = await selectCarGroupInfo(fines[i].car_group_id);
            result_data.push(Object.assign(fines[i], car_info[0]));
        }

        return res.status(200).json({
            success: true,
            message: 'successful',
            data: result_data,
        });
    } catch (e) {
        return res.status(406).json({
            success: false,
            message: 'fail',
        });
    }
};

const payFine = async (fine_id) => {
    try {
        let result = await deleteFines(fine_id);
        //console.log(result);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export { getFines, payFine };
