import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

router.route('/')
    .post(auth, admin, categoryController.createCategory)
    .get(categoryController.getCategories);

router.route('/:id')
    .get(categoryController.getCategoryById)
    .put(auth, admin, categoryController.updateCategory)
    .delete(auth, admin, categoryController.deleteCategory);

export default router;