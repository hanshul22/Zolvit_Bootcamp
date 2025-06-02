const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const userRoutes = require('./Routes/userRoutes');
const testRoutes = require('./Routes/testRoutes');

// Import database connection
const connectDB = require('./DB/db');

// Import custom error handler
const { globalErrorHandler, handleNotFound } = require('./middleware/errorHandler');

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Morgan logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Detailed logging for development
} else {
  app.use(morgan('combined')); // Standard Apache combined log format for production
}

// Custom logging middleware (keeping for additional custom logs if needed)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the User Management API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      createUser: 'POST /api/users',
      getUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id'
    },
    testing: {
      errorTests: '/api/test',
      description: 'Visit /api/test to see available error testing routes'
    },
    features: {
      errorHandling: 'Custom error handler with detailed logging',
      logging: 'Morgan HTTP request logging',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Handle unhandled routes (404 errors)
app.all('*', handleNotFound);

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`
    🚀 Server running at http://localhost:${port}
    📝 API Documentation available at http://localhost:${port}
    🔗 Users API: http://localhost:${port}/api/users
    📅 Started at: ${new Date().toISOString()}
    🌍 Environment: ${process.env.NODE_ENV || 'development'}
    📊 Logging: Morgan ${process.env.NODE_ENV === 'development' ? 'dev' : 'combined'} format
  `);
});

module.exports = app;
