import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { randProductDescription } from '@ngneat/falso';
import slugify from 'slugify'

import { products } from './products.js';

async function createProductsFromTopCategory(categoryName) {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
        console.log("Connected to MongoDB");

        // Find the top-level category
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            throw new Error(`Category "${categoryName}" not found.`);
        }

        let productsToCreate = [];

        // Access the subcategories within the products[categoryName]
        const subcategories = products[categoryName]?.[0]; // Access the first object

        if (!subcategories) {
            throw new Error(`No subcategories found for "${categoryName}".`);
        }

        // Iterate through subcategories
        for (const subcategoryName in subcategories) {
            const subcategory = await Category.findOne({ name: subcategoryName });

            if (Array.isArray(subcategories[subcategoryName])) {
                for (const productItem of subcategories[subcategoryName]) {

                    productsToCreate.push({
                        name: productItem.Title,
                        slug: slugify(productItem.Title),
                        description: randProductDescription(),
                        category: category._id,
                        subcategory: subcategory ? subcategory._id : undefined,
                        price: productItem.Price,
                        stock: 100,
                        images: [
                            productItem.Image,
                            "https://placehold.co/600x400?text=Second+Image",
                            "https://placehold.co/600x400?text=Third+Image",
                            "https://placehold.co/600x400?text=Fourth+Image",
                        ],
                    });
                }
            }
        }

        // Insert the collected products into the database
        const createdProducts = await Product.insertMany(productsToCreate);

        console.log('Products created:', createdProducts.length);
        return createdProducts;

    } catch (error) {
        console.error('Error creating products:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

// Example usage:
createProductsFromTopCategory('Shoes')
    .then((products) => {
        console.log('Created Products:', products.length);
    })
    .catch((error) => {
        console.error('Failed to create products', error);
    });
