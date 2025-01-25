import CartModel from "../models/CartModel.js";
import { errorResponse, successResponse } from '../utils/responseHandlers.js'


export const addToCart = async (req, res) => {
    const { product, color, size, quantity, price } = req.body;
    try {
        const userCart = await CartModel.findOne({ user: req.user._id }).populate('items.product', 'name images variants');
        if (userCart) {
            const itemIndex = userCart.items.findIndex(
                item => item.product.toString() === product.toString() && item.color === color && item.size === size
            );
            if (itemIndex !== -1) {
                userCart.items[itemIndex].quantity += quantity;
            } else {
                userCart.items.push(req.body);
            }
            await userCart.save();
            const cart = userCart
            return successResponse(res, 200, cart, 'Product added to cart');
        } else {
            const cart = new CartModel({
                user: req.user._id,
                items: [req.body],
            });
            await cart.populate('items.product', 'name images variants');
            await cart.save();
            return successResponse(res, 201, cart, 'Product added to cart');
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

export const getCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ user: req.user._id }).populate('items.product', 'name images variants');
        if (cart) {
            return successResponse(res, 200, cart);
        } else {
            return errorResponse(res, 404, 'Cart not found');
        }
    } catch (error) {
        console.error('Get cart error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

export const updateCartItem = async (req, res) => {
    try {
        const userCart = await CartModel.findOne({ user: req.user.id }).populate('items.product', 'name images variants');
        if (userCart) {
            const itemIndex = userCart.items.findIndex(item => item._id == req.params.id);
            if (itemIndex !== -1) {
                userCart.items[itemIndex].quantity = req.body.quantity;
                await userCart.save();
                return successResponse(res, 200, userCart, 'Cart updated');
            } else {
                return errorResponse(res, 404, 'Item not found');
            }
        } else {
            return errorResponse(res, 404, 'Cart not found');
        }
    } catch (error) {
        console.error('Update cart item error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

export const removeCartItem = async (req, res) => {
    try {
        const userCart = await CartModel.findOne({ user: req.user.id }).populate('items.product', 'name images variants');
        if (userCart) {
            const itemIndex = userCart.items.findIndex(item => item._id == req.params.id);
            if (itemIndex !== -1) {
                userCart.items = userCart.items.filter(item => item._id != req.params.id);
                await userCart.save();
                return successResponse(res, 200, userCart, 'Item removed from cart');
            } else {
                return errorResponse(res, 404, 'Item not found');
            }
        } else {
            return errorResponse(res, 404, 'Cart not found');
        }
    } catch (error) {
        console.error('Remove cart item error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

export const clearCart = async (req, res) => {
    try {
        const userCart = await CartModel.findOne({ user: req.user._id });
        if (userCart) {
            userCart.items = [];
            userCart.total = 0;
            await userCart.save();
            return successResponse(res, 200, userCart, 'Cart cleared');
        } else {
            return errorResponse(res, 404, 'Cart not found');
        }
    } catch (error) {
        console.error('Clear cart error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}