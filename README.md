# E-Commerce Node API

A robust backend API for an e-commerce application built using Node.js, Express, and MongoDB, featuring authentication, product management, orders, and payment integration.

## Features

- User Authentication (JWT-based login & signup)
- Role-based authorization (Admin/User)
- CRUD operations for products and categories
- Shopping cart management
- Order processing
- Secure payment integration (PayPal)
- Image upload functionality (Cloudinary integration)

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Payments:** PayPal
- **Storage:** Cloudinary for image uploads

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- PayPal account (for payments)

### Clone the Repository

```bash
$ git clone https://github.com/radouanMarour/ecommerce-node-api.git
$ cd ecommerce-node-api
```

### Backend Setup

```bash
$ npm install
$ touch .env  # Create an environment file
```

Add the following environment variables to `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run the backend server:

```bash
$ npm start
```

## API Endpoints

### Auth Routes

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### User Routes

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Product Routes

- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Order Routes

- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

## App URL

[Live Demo](https://e-commerce-webapp-mern.netlify.app/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork this project, raise issues, and submit pull requests.

## Contact

For any questions, reach out at radwanmr7\@gmail.com

