import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;

