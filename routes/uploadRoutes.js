import express from 'express';
import upload from '../configs/multer.js';
import * as uploadController from '../controllers/uploadController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

router.post('/single', auth, admin, upload.single('image'), uploadController.uploadSingleImage);
router.post('/multiple', auth, admin, upload.array('images'), uploadController.uploadMultipleImages);

export default router;