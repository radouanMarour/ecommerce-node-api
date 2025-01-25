import { errorResponse, successResponse } from '../utils/responseHandlers.js'

export const uploadSingleImage = (req, res) => {
    try {
        // After upload, Multer adds `req.file`s
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileUrl = req.file.path
        return successResponse(res, 200, fileUrl, 'File uploaded successfully')
    } catch (error) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
};


export const uploadMultipleImages = (req, res) => {
    try {
        // After upload, Multer adds `req.files`
        if (!req.files) {
            return errorResponse(res, 400, 'No files uploaded');
        }

        const fileUrls = req.files.map(file => file.path);
        return successResponse(res, 200, fileUrls, 'Files uploaded successfully')

    } catch (error) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
};