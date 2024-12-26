import dotenv from 'dotenv'
import { registerSchema, loginSchema } from '../validations/authValidations.js';
import User from '../models/User.js';

dotenv.config()

// Register User
export const registerUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details[0].message.replaceAll("\"", "") });
        }

        const { username, email, password } = req.body;

        const userExist = await User.findOne({ $or: [{ username }, { email }] });
        if (userExist) {
            return res.status(400).json({ error: 'Username or email already exists' })
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save()
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: error.details[0].message.replaceAll("\"", "") });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = user.generateToken()
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

