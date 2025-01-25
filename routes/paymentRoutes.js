import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.route('/paypal/create-order')
    .post(auth, paymentController.createOrder)

router.route('/paypal/capture-order')
    .post(auth, paymentController.captureOrder)

export default router