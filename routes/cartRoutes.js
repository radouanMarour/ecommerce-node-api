import express from 'express';
import * as cartController from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
    .post(auth, cartController.addToCart)
    .get(auth, cartController.getCart)
    .put(auth, cartController.clearCart);

router.route('/:id')
    .put(auth, cartController.updateCartItem)
    .delete(auth, cartController.removeCartItem)

export default router;