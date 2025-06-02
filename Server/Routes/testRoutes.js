const express = require('express');
const { APIError, catchAsync } = require('../middleware/errorHandler');
const router = express.Router();

// Test route for 400 Bad Request error
router.get('/400-error', (req, res, next) => {
  const error = new APIError('This is a test 400 error - Bad Request', 400);
  next(error);
});

// Test route for 401 Unauthorized error
router.get('/401-error', (req, res, next) => {
  const error = new APIError('This is a test 401 error - Unauthorized access', 401);
  next(error);
});

// Test route for 403 Forbidden error
router.get('/403-error', (req, res, next) => {
  const error = new APIError('This is a test 403 error - Forbidden resource', 403);
  next(error);
});

// Test route for 404 Not Found error
router.get('/404-error', (req, res, next) => {
  const error = new APIError('This is a test 404 error - Resource not found', 404);
  next(error);
});

// Test route for 500 Internal Server Error
router.get('/500-error', (req, res, next) => {
  const error = new APIError('This is a test 500 error - Internal server error', 500);
  next(error);
});

// Test route for async error handling
router.get('/async-error', catchAsync(async (req, res, next) => {
  // Simulate an async operation that fails
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new APIError('This is a test async error', 500));
    }, 100);
  });
  
  res.json({ message: 'This should never be reached' });
}));

// Test route for MongoDB-like cast error
router.get('/cast-error', (req, res, next) => {
  // Simulate a MongoDB CastError
  const error = new Error('Cast to ObjectId failed for value "invalid-id" at path "_id"');
  error.name = 'CastError';
  error.path = '_id';
  error.value = 'invalid-id';
  next(error);
});

// Test route for validation error
router.get('/validation-error', (req, res, next) => {
  // Simulate a MongoDB ValidationError
  const error = new Error('Validation failed');
  error.name = 'ValidationError';
  error.errors = {
    email: { message: 'Email is required' },
    name: { message: 'Name must be at least 3 characters long' }
  };
  next(error);
});

// Test route for unhandled promise rejection
router.get('/unhandled-rejection', catchAsync(async (req, res, next) => {
  // This will trigger an unhandled promise rejection
  JSON.parse('invalid json');
  res.json({ message: 'This should never be reached' });
}));

// Test route for successful response (for comparison)
router.get('/success', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'This is a successful response for comparison',
    timestamp: new Date().toISOString(),
    data: {
      user: 'test-user',
      id: '12345'
    }
  });
});

// Get all available test routes
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Error Testing Routes',
    description: 'Use these routes to test different error scenarios',
    routes: {
      success: 'GET /api/test/success - Test successful response',
      badRequest: 'GET /api/test/400-error - Test 400 Bad Request',
      unauthorized: 'GET /api/test/401-error - Test 401 Unauthorized',
      forbidden: 'GET /api/test/403-error - Test 403 Forbidden',
      notFound: 'GET /api/test/404-error - Test 404 Not Found',
      serverError: 'GET /api/test/500-error - Test 500 Internal Server Error',
      asyncError: 'GET /api/test/async-error - Test async error handling',
      castError: 'GET /api/test/cast-error - Test MongoDB cast error',
      validationError: 'GET /api/test/validation-error - Test validation error',
      unhandledRejection: 'GET /api/test/unhandled-rejection - Test unhandled promise rejection'
    },
    usage: 'Visit any of the above routes to see how errors are handled',
    note: 'Check the server console for detailed error logs'
  });
});

module.exports = router; 