# Custom Furniture Design E-commerce Platform

A modern e-commerce platform for custom furniture and wood/iron products with AI-powered design capabilities.

## Features

- User authentication and authorization
- Product catalog with filtering and search
- Custom furniture design creation
- AI-powered design generation
- Order management
- Admin dashboard
- Responsive design

## Tech Stack

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Redux, Material-UI
- AI Integration: OpenAI API
- Authentication: JWT
- File Storage: AWS S3 (for product images)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd custom-furniture-design
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Create a .env file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/furniture-design
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=development
```

4. Start the development servers:
```bash
# Start backend server
npm run dev

# Start frontend server (in a new terminal)
cd client
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create new product (admin)
- PUT /api/products/:id - Update product (admin)
- DELETE /api/products/:id - Delete product (admin)

### Designs
- GET /api/designs - Get all designs
- GET /api/designs/:id - Get single design
- POST /api/designs - Create new design
- POST /api/designs/generate - Generate AI design
- PUT /api/designs/:id - Update design
- DELETE /api/designs/:id - Delete design

### Orders
- GET /api/orders/my-orders - Get user's orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create new order
- PUT /api/orders/:id/status - Update order status (admin)
- PUT /api/orders/:id/cancel - Cancel order

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 