import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecommerce-images',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
    }
})
const upload = multer({ storage })

export default upload