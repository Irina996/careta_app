import { selectRentalList } from '../services/index.js';

const getRentalList = async (req, res) => {
    try {
        const { client_id } = req.query;
        let rentList = await selectRentalList(client_id);
        return res.status(200).json({
            success: true,
            message: 'successful',
            data: rentList,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'fail',
        });
    }
};

export { getRentalList };
