export const uploadSingleImage = (req, res) => {
    try {
        // After upload, Multer adds `req.file`s
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: req.file.path,
        });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed', details: error.message });
    }
};


export const uploadMultipleImages = (req, res) => {
    try {
        // After upload, Multer adds `req.files`
        if (!req.files) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const fileUrls = req.files.map(file => file.path);

        res.status(200).json({
            message: 'Files uploaded successfully',
            fileUrls,
        });
    } catch (error) {
        res.status(500).json({ error: 'Files upload failed', details: error.message });
    }
};