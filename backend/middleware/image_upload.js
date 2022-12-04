import streamifier from 'streamifier';
import { cloudinary } from "../config/cloudinary.js";

const uploadImage = async(req, res, next)=> {
    try {
        let cld_upload_stream = cloudinary.uploader
        .upload_stream(function (error, result) {     
            req.body.img_url = result.url;
            next();         
        });

        streamifier.createReadStream(req.files.image.data).pipe(cld_upload_stream);
    } catch (err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        })
    }
}

export {uploadImage}