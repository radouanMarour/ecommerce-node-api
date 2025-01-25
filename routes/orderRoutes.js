import express from 'express';
import * as orderController from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

router.route('/')
    .post(auth, orderController.placeOrder)
    .get(auth, orderController.getOrders);

router.route('/myorders')
    .get(auth, orderController.getMyOrders);

router.route('/summary')
    .get(auth, admin, orderController.getSummary);

router.route('/:id')
    .get(auth, orderController.getOrderById)
    .delete(auth, admin, orderController.deleteOrder);

router.route('/:id/pay')
    .put(auth, orderController.payOrder);

router.route('/:id/deliver')
    .put(auth, admin, orderController.markOrderAsDelivered);

export default router;