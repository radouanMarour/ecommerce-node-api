import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getCategories);

router.route('/:id')
    .get(categoryController.getCategoryById)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

export default router;