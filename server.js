import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

// Connect to MongoDB
connect("mongodb://localhost:27017/ecommerceDB")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
