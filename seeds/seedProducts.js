import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const products = [
    {
        name: "Classic White T-Shirt",
        description: "A high-quality white t-shirt made from 100% cotton.",
        price: 19.99,
        stock: 50,
        category: "Clothing",
        subcategory: "T-Shirts",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ],
        variants: [
            { color: "White", size: "M", stock: 20 },
            { color: "White", size: "L", stock: 30 }
        ]
    },
    {
        name: "Slim Fit Jeans",
        description: "Stylish slim-fit jeans with a modern cut.",
        price: 49.99,
        stock: 30,
        category: "Clothing",
        subcategory: "Jeans",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ],
        variants: [
            { color: "Blue", size: "32", stock: 10 },
            { color: "Black", size: "34", stock: 20 }
        ]
    },
    {
        name: "Running Sneakers",
        description: "Lightweight sneakers designed for running and training.",
        price: 89.99,
        stock: 20,
        category: "Footwear",
        subcategory: "Running Shoes",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ],
        variants: [
            { color: "Red", size: "9", stock: 10 },
            { color: "Blue", size: "10", stock: 10 }
        ]
    },
    {
        name: "Leather Wallet",
        description: "Premium leather wallet with multiple compartments.",
        price: 29.99,
        stock: 40,
        category: "Accessories",
        subcategory: "Wallets",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ],
        variants: [
            { color: "Brown", size: "One Size", stock: 40 }
        ]
    },
    {
        name: "Sports Hoodie",
        description: "Comfortable hoodie perfect for workouts and casual wear.",
        price: 39.99,
        stock: 25,
        category: "Clothing",
        subcategory: "Hoodies",
        images: [
            "https://placehold.co/600x400",
            "https://placehold.co/600x400"
        ],
        variants: [
            { color: "Gray", size: "M", stock: 15 },
            { color: "Gray", size: "L", stock: 10 }
        ]
    }
];

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
            // Find the category and subcategory by name
            const category = await Category.findOne({ name: product.category });
            const subcategory = product.subcategory ? await Category.findOne({ name: product.subcategory }) : null;

            if (!category) {
                console.error(`Category '${product.category}' not found. Skipping product: ${product.name}`);
                continue;
            }

            // Create and save the product
            const productDoc = new Product({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: category._id, // Reference the category ID
                subcategory: subcategory ? subcategory._id : null, // Reference the subcategory ID if available
                images: product.images,
                variants: product.variants,
                sold: Math.floor(Math.random() * 100), // Random sold value
                isFeatured: Math.random() < 0.3 // Randomly set as featured (30% chance)
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
