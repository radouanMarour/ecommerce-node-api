import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Product name is required',
            'string.min': 'Product name must be at least 3 characters',
            'string.max': 'Product name cannot exceed 100 characters'
        }),
    description: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters',
            'string.max': 'Description cannot exceed 1000 characters'
        }),
    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a valid number',
            'number.positive': 'Price must be greater than 0'
        }),
    category: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category is required'
        }),
    subcategory: Joi.string()
        .optional(),
    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'Stock must be a valid number',
            'number.min': 'Stock cannot be negative'
        }),
    images: Joi.array()
        .items(Joi.string().uri())
        .required()
        .messages({
            'array.base': 'Images must be an array of URLs',
            'array.includes': 'Each image must be a valid URL'
        }),
    variants: Joi.array()
        .items(Joi.object({
            color: Joi.string().required().messages({
                'string.empty': 'Color is required'
            }),
            size: Joi.string().required().messages({
                'string.empty': 'Size is required'
            }),
            stock: Joi.number().integer().min(0).required().messages({
                'number.base': 'Stock must be a valid number',
                'number.min': 'Stock cannot be negative'
            }),
            price: Joi.number().min(0).required().messages({
                'number.base': 'Price must be a valid number',
                'number.min': 'Price cannot be negative'
            })
        }))
        .optional(),
    ratings: Joi.object({
        average: Joi.number().min(0).max(5).optional(),
        count: Joi.number().integer().min(0).optional()
    }).optional(),
    reviews: Joi.array()
        .items(Joi.object({
            user: Joi.string().required().messages({
                'string.empty': 'User is required'
            }),
            rating: Joi.number().min(1).max(5).required().messages({
                'number.base': 'Rating must be a valid number',
                'number.min': 'Rating must be at least 1',
                'number.max': 'Rating cannot exceed 5'
            }),
            comment: Joi.string().required().messages({
                'string.empty': 'Comment is required'
            })
        }))
        .optional(),
    sold: Joi.number().integer().min(0).optional(),
    isFeatured: Joi.boolean().optional()
});

export const validateProduct = (product) => {
    return productSchema.validate(product, { abortEarly: false });
}