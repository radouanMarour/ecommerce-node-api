import Product from "../models/productModel.js";
import { validateProduct } from "../validations/productValidations.js";

// @desc Create a new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).send({ message: `${product.name} has been created` });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
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
            query.category = req.query.category;
        }

        // Filter by subcategory
        if (req.query.subcategory) {
            query.subcategory = req.query.subcategory;
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
        return res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).send({ error: 'Server error. Please try again later.' });
    }
};


// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
    console.log(req.params.id);
    try {
        const product = await Product.findById(req.params.id).populate('category subcategory', 'name');
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
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
            return res.status(400).send({ error: error.details[0].message });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category subcategory', 'name');
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({
            message: `${product.name} has been updated`,
            product
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({
            message: `${product.name} has been deleted`,
            productId: product._id
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Get featured products
// @route GET /api/products/featured
// @access Public
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

