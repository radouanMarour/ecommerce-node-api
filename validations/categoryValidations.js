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
    subcategories: Joi.array().items(objectId).optional().messages({
        'string.empty': 'Subcategories must be an array of valid ObjectIds'
    }),
    parent: objectId.allow(null).default(null).messages({
        'string.empty': 'Parent must be a valid ObjectId or null'
    }),
    image: Joi.string().allow("").default("").messages({
        'string.uri': 'Image must be a valid URI'
    })
});

export const validateCategory = (category) => {
    return categorySchema.validate(category, { abortEarly: false });
};
