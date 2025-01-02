import express from 'express';
import upload from '../configs/multer.js';
import * as uploadController from '../controllers/uploadController.js';

const router = express.Router();

router.post('/single', upload.single('image'), uploadController.uploadSingleImage);
router.post('/multiple', upload.array('images'), uploadController.uploadMultipleImages);

export default router;