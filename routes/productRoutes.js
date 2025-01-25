import express from 'express';
import * as productController from '../controllers/productController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(auth, admin, productController.createProduct);

router.route('/featured')
    .get(productController.getFeaturedProducts);

router.route('/:id/reviews')
    .post(auth, productController.addProductReview)

router.route('/:id')
    .get(productController.getProductById)
    .put(auth, admin, productController.updateProduct)
    .delete(auth, admin, productController.deleteProduct);

export default router;
