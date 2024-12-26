import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct);

router.route('/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

router.route('/featured').get(productController.getFeaturedProducts);

export default router;
