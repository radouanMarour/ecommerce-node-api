import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { validateProduct } from "../validations/productValidations.js";
import { errorResponse, successResponse } from '../utils/responseHandlers.js'

// @desc Create a new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) {
            return errorResponse(res, 400, error.details[0].message);
        }
        const product = new Product(req.body);
        await product.save();
        return successResponse(res, 201, product, `${product.name} has been created`);
    } catch (error) {
        console.error('Create product error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Get all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
    const { priceMin, priceMax, size, color, sort } = req.query;

    try {
        // Build the query object
        const query = {};

        // Filter by category
        if (req.query.category) {
            const category = await Category.findOne({
                name: { $regex: new RegExp(req.query.category, "i") }
            });
            if (category) {
                query.category = category._id;
            }
        }

        // Filter by subcategory
        if (req.query.subcategory) {
            const subcategory = await Category.findOne({
                name: { $regex: new RegExp(req.query.subcategory, "i") }
            });
            if (subcategory) {
                query.subcategory = subcategory._id;
            }

        }

        if (req.query.search) {
            query.$or = [
                { name: { $regex: new RegExp(req.query.search, "i") } },
                { description: { $regex: new RegExp(req.query.search, "i") } }
            ];
        }

        // Price range filter
        if (priceMin || priceMax) {
            query.price = {
                ...(priceMin && { $gte: Number(priceMin) }),
                ...(priceMax && { $lte: Number(priceMax) }),
            };
        }

        // Size filter
        if (size) {
            query['variants.size'] = size;
        }

        // Color filter
        if (color) {
            query['variants.color'] = color;
        }

        // Sorting (default: no sort)
        const sortOptions = {};
        if (sort === 'price_asc') {
            sortOptions.price = 1; // Ascending
        } else if (sort === 'price_desc') {
            sortOptions.price = -1; // Descending
        } else if (sort === 'newest') {
            sortOptions.createdAt = -1; // Newest first
        }
        // Fetch filtered and sorted products
        const products = await Product.find(query).sort(sortOptions);

        // Return the products
        return successResponse(res, 200, products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return errorResponse(res, 500, 'Server error. Please try again later.');
    }
};


// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category subcategory', 'name')
            .populate('reviews.user', 'username');
        if (!product) {
            return errorResponse(res, 404, 'Product not fount')
        }
        return successResponse(res, 200, product)
    } catch (error) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
    const propertyCount = Object.keys(req.body).length;
    try {
        const { error } = validateProduct(req.body);
        if (error && propertyCount > 1) {
            return errorResponse(res, 400, error.details[0].message);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category subcategory', 'name');
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        return successResponse(res, 200, product, `${product.name} has been updated`);
    } catch (error) {
        console.error('Update product error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        return successResponse(res, 200, { productId: product._id }, `${product.name} has been deleted`);
    } catch (error) {
        console.error('Delete product error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Get featured products
// @route GET /api/products/featured
// @access Public
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        return successResponse(res, 200, products)
    } catch (error) {
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Add Review for a product
// @route PUT /api/products/:id/reviews
// @access Private
export const addProductReview = async (req, res) => {
    try {
        if (!req.user) {
            return errorResponse(res, 401, 'User not authenticated');
        }
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return errorResponse(res, 404, 'Product not found');
        }
        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment,
        };

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return errorResponse(res, 400, 'Product already reviewed');
        }

        product.reviews.push(review);
        product.ratings.count = product.reviews.length;
        product.ratings.average = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        return successResponse(res, 201, product, 'Review added successfully');
    } catch (error) {
        console.error('Add review error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
};

