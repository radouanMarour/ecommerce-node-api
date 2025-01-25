import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';

const categories = [
    {
        name: "Clothing",
        subcategories: [
            "T-Shirts",
            "Shirts",
            "Hoodies",
            "Sweaters",
            "Jeans",
            "Jackets",
            "Coats",
        ]
    },
    {
        name: "Footwear",
        subcategories: [
            "Sneakers",
            "Slip-Ons",
            "Brogues",
            "Running Shoes",
            "Training Shoes",
            "Sandals",
            "Boots"
        ]
    },
    {
        name: "Accessories",
        subcategories: [
            "Watches",
            "Belts",
            "Bags",
            "Wallets",
            "Sunglasses",
            "Ties",
            "Cufflinks"
        ]
    }
];

const seedCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
        console.log('Connected to MongoDB');

        // Clear existing categories
        await Category.deleteMany();
        console.log('Existing categories cleared');

        // Create categories and subcategories with parent relationships
        for (const category of categories) {
            // Create main category
            const categoryDoc = new Category({
                name: category.name,
                parent: null, // Main category has no parent
            });
            await categoryDoc.save();

            // Create subcategories with parent reference
            for (const subcategory of category.subcategories) {
                const subcategoryDoc = new Category({
                    name: subcategory,
                    parent: categoryDoc._id, // Reference the parent category
                });
                await subcategoryDoc.save();

                // Add subcategory to parent's `subcategories` array
                categoryDoc.subcategories.push(subcategoryDoc._id);
            }

            // Save the updated parent category with subcategories
            await categoryDoc.save();
        }

        console.log('Categories and subcategories seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
