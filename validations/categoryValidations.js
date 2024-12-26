import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ObjectId');
    }
    return value;
}, 'ObjectId validation');

const categorySchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    description: Joi.string().trim().optional().messages({
        'string.empty': 'Description cannot be empty'
    }),
    parent: objectId.allow(null).optional().messages({
        'string.empty': 'Parent must be a valid ObjectId or null'
    }),
    subcategories: Joi.array().items(objectId).optional().messages({
        'string.empty': 'Subcategories must be an array of valid ObjectIds'
    }),
    image: Joi.string().uri().optional().messages({
        'string.uri': 'Image must be a valid URI'
    })
});

export const validateCategory = (category) => {
    return categorySchema.validate(category, { abortEarly: false });
};