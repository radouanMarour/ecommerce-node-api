import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            color: {
                type: String,
            },
            size: {
                type: String,
            }
        }
    ],
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

cartSchema.pre('save', function (next) {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    next();
});

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;