const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const userRoutes = require('./Routes/userRoutes');

// Import database connection
const connectDB = require('./DB/db');

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);

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
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `The endpoint ${req.method} ${req.originalUrl} does not exist`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Start server
app.listen(port, () => {
  console.log(`
    🚀 Server running at http://localhost:${port}
    📝 API Documentation available at http://localhost:${port}
    🔗 Users API: http://localhost:${port}/api/users
    📅 Started at: ${new Date().toISOString()}
  `);
});

module.exports = app;
