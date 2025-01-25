import Category from '../models/categoryModel.js';
import { validateCategory } from '../validations/categoryValidations.js';
import { errorResponse, successResponse } from '../utils/responseHandlers.js'


// @desc Create a new category
// @route POST /api/categories
// @access Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return errorResponse(res, 400, error.details[0].message);
        }
        const existingCategory = await Category.findOne({ name: req.body.name });
        if (existingCategory) {
            return errorResponse(res, 400, 'Category already exists');
        }
        const category = new Category(req.body);
        await category.save();
        if (category.parent) {
            const parentCategory = await Category.findById(category.parent);
            parentCategory.subcategories.push(category._id);
            await parentCategory.save();
        }
        return successResponse(res, 201, category, `${category.name} has been created`);
    } catch (error) {
        console.error('Create category error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Get all categories
// @route GET /api/categories
// @access Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        return successResponse(res, 200, categories);
    } catch (error) {
        console.error('Get categories error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('subcategories');
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        return successResponse(res, 200, category);
    } catch (error) {
        console.error('Get category by ID error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Update a category  
// @route PUT /api/categories/:id
// @access Private/Admin
export const updateCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return errorResponse(res, 400, error.details[0].message);
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        return successResponse(res, 200, category, `${category.name} has been updated`);
    } catch (error) {
        console.error('Update category error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        if (category.parent) {
            const parentCategory = await Category.findById(category.parent);
            parentCategory.subcategories = parentCategory.subcategories.filter(
                subcategory => subcategory.toString() !== category._id.toString()
            );
            await parentCategory.save();
        }
        return successResponse(res, 200, { categoryId: category._id }, `${category.name} has been deleted`);
    } catch (error) {
        console.error('Delete category error:', error);
        return errorResponse(res, 500, 'Server error. Please try again');
    }
}

