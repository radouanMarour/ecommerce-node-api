import paypal from '@paypal/checkout-server-sdk';
import express from 'express'
import client from '../configs/paypal.js'
import { errorResponse, successResponse } from '../utils/responseHandlers.js'


const router = express.Router();

// Create paypal order route
export const createOrder = async (req, res) => {
    const { amount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            },
        ],
    });

    try {
        const response = await client.execute(request);
        return successResponse(res, 200, { id: response.result.id })
    } catch (err) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
};

// Capture paypal payment route
export const captureOrder = async (req, res) => {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);

    try {
        const response = await client.execute(request);
        // console.log(response.result)
        if (response.result.status === "COMPLETED") {
            return successResponse(res, 200, {
                paymentResult: {
                    id: response.result.id,
                    status: response.result.status,
                    email: response.result.payer.email_address,
                    update_time: new Date().toISOString(),
                }
            })
        }
    } catch (err) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
};

export default router
