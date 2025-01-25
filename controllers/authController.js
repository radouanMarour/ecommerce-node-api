import dotenv from 'dotenv';
import { registerSchema, loginSchema } from '../validations/authValidations.js';
import User from '../models/User.js';
import { errorResponse, successResponse } from '../utils/responseHandlers.js'

dotenv.config();


/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return errorResponse(res, 400, error.details[0].message.replaceAll("\"", ""));
        }

        const { username, email, password } = req.body;

        const userExist = await User.findOne({ $or: [{ username }, { email }] });
        if (userExist) {
            return errorResponse(res, 400, 'Username or email already exists');
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        return successResponse(res, 201, "User created successfully", null);
    } catch (err) {
        console.error(err);
        return errorResponse(res, 500, 'Server error');
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return errorResponse(res, 400, error.details[0].message.replaceAll("\"", ""));
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, 400, 'Invalid credentials');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 400, 'Invalid credentials');
        }

        const token = user.generateToken();
        return successResponse(res, 200, { token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        return errorResponse(res, 500, 'Server error');
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        const { username, email, password } = req.body;

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;

        const updatedUser = await user.save();

        return successResponse(res, 200, {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role
        }, 'Profile updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, 500, 'Server error');
    }
};
