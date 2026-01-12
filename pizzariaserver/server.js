require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const autoSeed = require('./utils/seedDatabase');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const pizzaRoutes = require('./routes/pizzaRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Auto-seed database on connection
    const mongoose = require('mongoose');
    mongoose.connection.once('open', () => {
      autoSeed();
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
