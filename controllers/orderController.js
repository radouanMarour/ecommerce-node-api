import Order from '../models/orderModel.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import User from '../models/User.js';
import { errorResponse, successResponse } from '../utils/responseHandlers.js'


// @desc Place an order
// @route POST /api/orders
// @access Private
export const placeOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        return successResponse(res, 201, createdOrder, 'Order placed successfully');
    } catch (error) {
        console.error('Place order error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name images');
        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }
        if (order.user._id.toString() !== req.user._id.toString()) {
            return errorResponse(res, 403, 'Access forbidden: Not authorized to view this order');
        }
        return successResponse(res, 200, order);
    } catch (error) {
        console.error('Get order by ID error:', error);
        return errorResponse(res, 500, 'Failed to fetch order details');
    }
}

// @desc get all orders
// @route GET /api/orders
// @access Private
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'username email')
            .populate('orderItems.product', 'name images');
        return successResponse(res, 200, orders);
    } catch (error) {
        console.error('Get orders error:', error);
        return errorResponse(res, 500, 'Failed to fetch orders');
    }
}

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const payOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return errorResponse(res, 403, 'Not authorized');
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.paymentResult.id,
            status: req.body.paymentResult.status,
            email_address: req.body.paymentResult.email,
            update_time: req.body.paymentResult.update_time,
        };
        const updatedOrder = await order.save();
        return successResponse(res, 200, updatedOrder, 'Payment status updated');
    } catch (error) {
        console.error('Pay order error:', error);
        return errorResponse(res, 500, 'Failed to update payment status');
    }
}

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const markOrderAsDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return errorResponse(res, 403, 'Not authorized');
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        return successResponse(res, 200, updatedOrder, 'Payment status updated');
    } catch (error) {
        console.error('Pay order error:', error);
        return errorResponse(res, 500, 'Failed to update payment status');
    }
}

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private/Admin
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }
        return successResponse(res, 200, { orderId: order._id }, 'Order has been deleted');
    } catch (error) {
        console.error('Delete order error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product', 'name images');
        return successResponse(res, 200, orders);
    } catch (error) {
        console.error('Get my orders error:', error);
        return errorResponse(res, 500, 'Failed to fetch your orders');
    }
}

// @desc    Get Dashboard Summary data
// @route   GET /api/summary
// @access  Private
export const getSummary = async (req, res) => {
    try {
        // Fetch data
        const totalRevenue = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
            .select("name stock");

        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();

        // Sales chart data (grouped by date)
        const salesChart = await Order.aggregate([
            { $match: { isPaid: true } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } } // Sort by date
        ]);
        return successResponse(res, 200, {
            revenue: totalRevenue[0]?.total || 0,
            orders: recentOrders,
            lowStock: lowStockProducts,
            customerMetrics: {
                totalUsers,
                totalProducts,
                totalCategories,
            },
            salesChart,
        });
    } catch (error) {
        console.error("Error fetching summary data:", error);
        return errorResponse(res, 500, "Failed to fetch summary data");
    }
};