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
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
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
    try {
        const { error } = validateProduct(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ message: `${product.name} has been updated` });
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
        res.status(200).send({ message: `${product.name} has been deleted` });
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

