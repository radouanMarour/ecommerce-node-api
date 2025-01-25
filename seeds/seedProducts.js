import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const products = [
    {
        name: "Classic Cotton T-Shirt",
        description: "Comfortable everyday basic t-shirt made from 100% cotton",
        category: "Clothing",
        subcategory: "T-Shirts",
        price: 19.99, // Lowest variant price
        stock: 150, // Will be calculated from variants
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "White", size: "S", price: 19.99, stock: 50 },
            { color: "White", size: "M", price: 19.99, stock: 60 },
            { color: "Black", size: "L", price: 21.99, stock: 40 }
        ]
    },
    {
        name: "Running Pro Sneakers",
        description: "Lightweight running shoes with advanced cushioning",
        category: "Footwear",
        subcategory: "Running Shoes",
        price: 89.99, // Lowest variant price
        stock: 120,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Blue", size: "40", price: 89.99, stock: 40 },
            { color: "Red", size: "42", price: 89.99, stock: 45 },
            { color: "Black", size: "44", price: 94.99, stock: 35 }
        ]
    },
    {
        name: "Premium Leather Belt",
        description: "Genuine leather belt with classic buckle",
        category: "Accessories",
        subcategory: "Belts",
        price: 34.99, // Lowest variant price
        stock: 90,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Brown", size: "32", price: 34.99, stock: 30 },
            { color: "Black", size: "34", price: 34.99, stock: 30 },
            { color: "Tan", size: "36", price: 36.99, stock: 30 }
        ]
    },
    {
        name: "Denim Blue Jeans",
        description: "Classic fit denim jeans with stretch comfort",
        category: "Clothing",
        subcategory: "Jeans",
        price: 59.99, // Lowest variant price
        stock: 100,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Light Blue", size: "30x32", price: 59.99, stock: 35 },
            { color: "Dark Blue", size: "32x32", price: 59.99, stock: 35 },
            { color: "Black", size: "34x32", price: 64.99, stock: 30 }
        ]
    },
    {
        name: "Sport Digital Watch",
        description: "Water-resistant digital watch with multiple features",
        category: "Accessories",
        subcategory: "Watches",
        price: 129.99, // Lowest variant price
        stock: 75,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Black", size: "Standard", price: 129.99, stock: 25 },
            { color: "Silver", size: "Standard", price: 134.99, stock: 25 },
            { color: "Gold", size: "Standard", price: 139.99, stock: 25 }
        ]
    },
    {
        name: "Winter Wool Coat",
        description: "Warm wool blend coat perfect for winter",
        category: "Clothing",
        subcategory: "Coats",
        price: 149.99, // Lowest variant price
        stock: 60,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Navy", size: "S", price: 149.99, stock: 20 },
            { color: "Grey", size: "M", price: 149.99, stock: 20 },
            { color: "Black", size: "L", price: 154.99, stock: 20 }
        ]
    },
    {
        name: "Leather Boots",
        description: "Classic leather boots with durable sole",
        category: "Footwear",
        subcategory: "Boots",
        price: 99.99, // Lowest variant price
        stock: 90,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Brown", size: "41", price: 99.99, stock: 30 },
            { color: "Black", size: "43", price: 99.99, stock: 30 },
            { color: "Tan", size: "45", price: 104.99, stock: 30 }
        ]
    },
    {
        name: "Designer Sunglasses",
        description: "UV protected stylish sunglasses",
        category: "Accessories",
        subcategory: "Sunglasses",
        price: 79.99, // Lowest variant price
        stock: 60,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Black", size: "Standard", price: 79.99, stock: 20 },
            { color: "Tortoise", size: "Standard", price: 79.99, stock: 20 },
            { color: "Gold", size: "Standard", price: 84.99, stock: 20 }
        ]
    },
    {
        name: "Casual Slip-Ons",
        description: "Comfortable casual slip-on shoes",
        category: "Footwear",
        subcategory: "Slip-Ons",
        price: 49.99, // Lowest variant price
        stock: 90,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Grey", size: "40", price: 49.99, stock: 30 },
            { color: "Navy", size: "42", price: 49.99, stock: 30 },
            { color: "Black", size: "44", price: 54.99, stock: 30 }
        ]
    },
    {
        name: "Cotton Hoodie",
        description: "Soft cotton blend hoodie with front pocket",
        category: "Clothing",
        subcategory: "Hoodies",
        price: 44.99, // Lowest variant price
        stock: 120,
        images: ["https://placehold.co/400x300", "https://placehold.co/400x300"],
        variants: [
            { color: "Grey", size: "S", price: 44.99, stock: 40 },
            { color: "Black", size: "M", price: 44.99, stock: 40 },
            { color: "Navy", size: "L", price: 49.99, stock: 40 }
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

            // Calculate total stock from variants
            const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);

            // Create and save the product
            const productDoc = new Product({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: totalStock, // Set total stock based on variants
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
