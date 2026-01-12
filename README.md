# Pizzeria Application

This is a full-stack pizza ordering application consisting of a React frontend and a Node.js/Express backend with MongoDB.

## Project Structure

```
Pizzeria/
├── pizzeriaapp/          # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── screens/      # Page components
│   │   ├── services/     # API service layer
│   │   └── config/       # Configuration files
│   └── ...
└── pizzariaserver/        # Node.js/Express backend
    ├── config/           # Database configuration
    ├── controllers/      # Request handlers
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    ├── utils/            # Utility functions
    └── data/             # Seed data
```

## Prerequisites

- Node.js (v16 or higher) and npm
- MongoDB (running locally or connection string)

## Installation and Setup

### 1. Backend (pizzariaserver)

Navigate to the server directory and install dependencies:

```bash
cd pizzariaserver
npm install
```

Create a `.env` file (or copy from `.env.example`):

```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/PIZZARIADB
CORS_ORIGIN=http://localhost:5173
```

Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will automatically seed the database with initial data on first run.

### 2. Frontend (pizzeriaapp)

Open a new terminal, navigate to the app directory and install dependencies:

```bash
cd pizzeriaapp
npm install
```

Create a `.env` file (or copy from `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:4000
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

## Available Scripts

### Backend

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run preview` - Preview production build

## Features

- **Order Pizza**: Browse a catalog of pizzas with detailed information
- **Build Your Pizza**: Custom pizza builder with ingredient selection and real-time price calculation
- **Shopping Cart**: Manage your order items, update quantities, and view total cost with tax calculation

## API Endpoints

### Pizzas
- `GET /api/pizzas` - Get all pizzas
- `GET /api/pizzas/seed` - Seed pizzas collection

### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `GET /api/ingredients/seed` - Seed ingredients collection

### Cart
- `GET /api/cart` - Get all cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

## Code Quality

The project follows industry standards with:

- **ESLint** for code linting
- **Prettier** for code formatting
- **MVC architecture** for backend organization
- **Service layer pattern** for API calls
- **Error handling** middleware
- **Environment variables** for configuration
- **Input validation** on API endpoints

## Technologies Used

### Frontend
- React 19
- React Router DOM
- Bootstrap 5
- Axios
- Vite

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- CORS
- dotenv