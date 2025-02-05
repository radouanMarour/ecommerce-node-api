import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import { products } from './products.js';



const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany();
        console.log('Existing products cleared');

        // Seed products
        for (const product of products) {

            // Calculate total stock from variants
            const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);

            // Create and save the product
            const productDoc = new Product({
                ...product,
                stock: totalStock
            });

            await productDoc.save();
            console.log(`Product '${product.name}' added successfully`);
        }

        console.log('Products seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
