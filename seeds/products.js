export const products = [
    // Clothing - Shirts
    {
        name: "Men's Casual Shirt",
        description: "A comfortable and stylish casual shirt for men.",
        price: 25.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d63", // Shirts
        stock: 50,
        images: [
            "https://placehold.co/800x600.png?text=Mens+Casual+Shirt+1",
            "https://placehold.co/800x600.png?text=Mens+Casual+Shirt+2",
            "https://placehold.co/800x600.png?text=Mens+Casual+Shirt+3",
            "https://placehold.co/800x600.png?text=Mens+Casual+Shirt+4"
        ],
        variants: [
            { color: "Blue", size: "M", stock: 10, price: 25.99 },
            { color: "White", size: "L", stock: 5, price: 27.99 },
        ],
        ratings: { average: 4.5, count: 10 },
        reviews: [],
        sold: 20,
        isFeatured: true,
    },
    {
        name: "Women's Formal Shirt",
        description: "A sleek and professional shirt for women.",
        price: 35.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d63", // Shirts
        stock: 40,
        images: [
            "https://placehold.co/800x600.png?text=Womens+Formal+Shirt+1",
            "https://placehold.co/800x600.png?text=Womens+Formal+Shirt+2",
            "https://placehold.co/800x600.png?text=Womens+Formal+Shirt+3",
            "https://placehold.co/800x600.png?text=Womens+Formal+Shirt+4"
        ],
        variants: [
            { color: "Black", size: "S", stock: 5, price: 35.99 },
            { color: "Gray", size: "M", stock: 8, price: 37.99 },
        ],
        ratings: { average: 4.7, count: 12 },
        reviews: [],
        sold: 15,
        isFeatured: false,
    },

    // Clothing - Jeans
    {
        name: "Slim Fit Jeans",
        description: "Stylish slim-fit jeans for everyday wear.",
        price: 49.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d69", // Jeans
        stock: 60,
        images: [
            "https://placehold.co/800x600.png?text=Slim+Fit+Jeans+1",
            "https://placehold.co/800x600.png?text=Slim+Fit+Jeans+2",
            "https://placehold.co/800x600.png?text=Slim+Fit+Jeans+3",
            "https://placehold.co/800x600.png?text=Slim+Fit+Jeans+4"
        ],
        variants: [
            { color: "Dark Blue", size: "32", stock: 15, price: 49.99 },
            { color: "Black", size: "34", stock: 12, price: 51.99 },
        ],
        ratings: { average: 4.3, count: 8 },
        reviews: [],
        sold: 25,
        isFeatured: false,
    },
    {
        name: "High-Waist Women's Jeans",
        description: "Comfortable and trendy high-waist jeans for women.",
        price: 45.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d69", // Jeans
        stock: 30,
        images: [
            "https://placehold.co/800x600.png?text=High+Waist+Jeans+1",
            "https://placehold.co/800x600.png?text=High+Waist+Jeans+2",
            "https://placehold.co/800x600.png?text=High+Waist+Jeans+3",
            "https://placehold.co/800x600.png?text=High+Waist+Jeans+4"
        ],
        variants: [
            { color: "Light Blue", size: "28", stock: 8, price: 45.99 },
            { color: "Black", size: "30", stock: 10, price: 47.99 },
        ],
        ratings: { average: 4.8, count: 20 },
        reviews: [],
        sold: 10,
        isFeatured: true,
    },

    // Clothing - Jackets
    {
        name: "Men's Leather Jacket",
        description: "Classic leather jacket for a bold style.",
        price: 99.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d6b", // Jackets
        stock: 20,
        images: [
            "https://placehold.co/800x600.png?text=Leather+Jacket+1",
            "https://placehold.co/800x600.png?text=Leather+Jacket+2",
            "https://placehold.co/800x600.png?text=Leather+Jacket+3",
            "https://placehold.co/800x600.png?text=Leather+Jacket+4"
        ],
        variants: [
            { color: "Black", size: "L", stock: 5, price: 99.99 },
            { color: "Brown", size: "M", stock: 5, price: 97.99 },
        ],
        ratings: { average: 4.6, count: 15 },
        reviews: [],
        sold: 5,
        isFeatured: true,
    },
    {
        name: "Women's Winter Coat",
        description: "Keep warm and stylish with this premium winter coat.",
        price: 120.99,
        category: "678fb0453f77fb3249b83d5f", // Clothing
        subcategory: "678fb0453f77fb3249b83d6b", // Jackets
        stock: 25,
        images: [
            "https://placehold.co/800x600.png?text=Winter+Coat+1",
            "https://placehold.co/800x600.png?text=Winter+Coat+2",
            "https://placehold.co/800x600.png?text=Winter+Coat+3",
            "https://placehold.co/800x600.png?text=Winter+Coat+4"
        ],
        variants: [
            { color: "Beige", size: "S", stock: 10, price: 120.99 },
            { color: "Gray", size: "M", stock: 8, price: 122.99 },
        ],
        ratings: { average: 4.9, count: 25 },
        reviews: [],
        sold: 12,
        isFeatured: true,
    },

    // Footwear - Sneakers
    {
        name: "Running Sneakers",
        description: "Lightweight sneakers perfect for running.",
        price: 59.99,
        category: "678fb0453f77fb3249b83d70", // Footwear
        subcategory: "678fb0453f77fb3249b83d72", // Sneakers
        stock: 50,
        images: [
            "https://placehold.co/800x600.png?text=Running+Sneakers+1",
            "https://placehold.co/800x600.png?text=Running+Sneakers+2",
            "https://placehold.co/800x600.png?text=Running+Sneakers+3",
            "https://placehold.co/800x600.png?text=Running+Sneakers+4"
        ],
        variants: [
            { color: "White", size: "10", stock: 10, price: 59.99 },
            { color: "Black", size: "9", stock: 8, price: 59.99 },
        ],
        ratings: { average: 4.7, count: 18 },
        reviews: [],
        sold: 30,
        isFeatured: true,
    },
    {
        name: "Casual Sneakers",
        description: "Trendy sneakers for daily wear.",
        price: 49.99,
        category: "678fb0453f77fb3249b83d70", // Footwear
        subcategory: "678fb0453f77fb3249b83d72", // Sneakers
        stock: 40,
        images: [
            "https://placehold.co/800x600.png?text=Casual+Sneakers+1",
            "https://placehold.co/800x600.png?text=Casual+Sneakers+2",
            "https://placehold.co/800x600.png?text=Casual+Sneakers+3",
            "https://placehold.co/800x600.png?text=Casual+Sneakers+4"
        ],
        variants: [
            { color: "Red", size: "8", stock: 5, price: 49.99 },
            { color: "Blue", size: "9", stock: 8, price: 49.99 },
        ],
        ratings: { average: 4.4, count: 10 },
        reviews: [],
        sold: 10,
        isFeatured: false,
    },

    // Footwear - Sandals
    {
        name: "Beach Sandals",
        description: "Comfortable and durable sandals for the beach.",
        price: 19.99,
        category: "678fb0453f77fb3249b83d70", // Footwear
        subcategory: "678fb0453f77fb3249b83d7c", // Sandals
        stock: 60,
        images: [
            "https://placehold.co/800x600.png?text=Beach+Sandals+1",
            "https://placehold.co/800x600.png?text=Beach+Sandals+2",
            "https://placehold.co/800x600.png?text=Beach+Sandals+3",
            "https://placehold.co/800x600.png?text=Beach+Sandals+4"
        ],
        variants: [
            { color: "Blue", size: "8", stock: 15, price: 19.99 },
            { color: "Yellow", size: "9", stock: 10, price: 19.99 },
        ],
        ratings: { average: 4.3, count: 7 },
        reviews: [],
        sold: 5,
        isFeatured: false,
    },
    {
        name: "Luxury Sandals",
        description: "Elegant sandals for summer outings.",
        price: 29.99,
        category: "678fb0453f77fb3249b83d70", // Footwear
        subcategory: "678fb0453f77fb3249b83d7c", // Sandals
        stock: 30,
        images: [
            "https://placehold.co/800x600.png?text=Luxury+Sandals+1",
            "https://placehold.co/800x600.png?text=Luxury+Sandals+2",
            "https://placehold.co/800x600.png?text=Luxury+Sandals+3",
            "https://placehold.co/800x600.png?text=Luxury+Sandals+4"
        ],
        variants: [
            { color: "Brown", size: "7", stock: 5, price: 29.99 },
            { color: "Black", size: "8", stock: 5, price: 29.99 },
        ],
        ratings: { average: 4.5, count: 9 },
        reviews: [],
        sold: 8,
        isFeatured: true,
    },

    // Accessories - Watches
    {
        name: "Analog Wristwatch",
        description: "Classic analog wristwatch with leather strap.",
        price: 79.99,
        category: "678fb0453f77fb3249b83d81", // Accessories
        subcategory: "678fb0453f77fb3249b83d83", // Watches
        stock: 25,
        images: [
            "https://placehold.co/800x600.png?text=Analog+Watch+1",
            "https://placehold.co/800x600.png?text=Analog+Watch+2",
            "https://placehold.co/800x600.png?text=Analog+Watch+3",
            "https://placehold.co/800x600.png?text=Analog+Watch+4"
        ],
        variants: [
            { color: "Brown", size: "Standard", stock: 5, price: 79.99 },
        ],
        ratings: { average: 4.8, count: 22 },
        reviews: [],
        sold: 8,
        isFeatured: true,
    },
    {
        name: "Digital Sports Watch",
        description: "Durable and waterproof digital sports watch.",
        price: 59.99,
        category: "678fb0453f77fb3249b83d81", // Accessories
        subcategory: "678fb0453f77fb3249b83d83", // Watches
        stock: 30,
        images: [
            "https://placehold.co/800x600.png?text=Digital+Watch+1",
            "https://placehold.co/800x600.png?text=Digital+Watch+2",
            "https://placehold.co/800x600.png?text=Digital+Watch+3",
            "https://placehold.co/800x600.png?text=Digital+Watch+4"
        ],
        variants: [
            { color: "Black", size: "Standard", stock: 10, price: 59.99 },
        ],
        ratings: { average: 4.6, count: 15 },
        reviews: [],
        sold: 5,
        isFeatured: false,
    },
];
