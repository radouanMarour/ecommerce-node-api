import Category from '../models/categoryModel.js';
import { validateCategory } from '../validations/categoryValidations.js';

// @desc Create a new category
// @route POST /api/categories
// @access Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const existingCategory = await Category.findOne({ name: req.body.name });
        if (existingCategory) {
            return res.status(400).send({ error: 'Category already exists' });
        }
        const category = new Category(req.body);
        await category.save();
        if (category.parent) {
            const parentCategory = await Category.findById(category.parent);
            parentCategory.subcategories.push(category._id);
            await parentCategory.save();
        }
        res.status(201).send({ message: `${category.name} has been created` });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Get all categories
// @route GET /api/categories
// @access Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.send(categories);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subcategories');
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send(category);
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Update a category  
// @route PUT /api/categories/:id
// @access Private/Admin
export const updateCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send({
            message: `${category.name} has been updated`,
            category
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        if (category.parent) {
            const parentCategory = await Category.findById(category.parent);
            parentCategory.subcategories = parentCategory.subcategories.filter(
                subcategory => subcategory.toString() !== category._id.toString()
            );
            await parentCategory.save();
        }
        res.send({
            message: `${category.name} has been deleted`,
            categoryId: category.id
        });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again' });
    }
}

