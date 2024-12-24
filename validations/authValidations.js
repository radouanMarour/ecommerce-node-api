import Joi from 'joi'

export const registerSchema = Joi.object({
    username: Joi.string().min(5).required().label('Username'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).required().label('Password'),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
});
