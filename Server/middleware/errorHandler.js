const colors = require('colors');

/**
 * Custom Error Class for API Errors
 */
class APIError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle MongoDB Cast Errors
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new APIError(message, 400);
};

/**
 * Handle MongoDB Duplicate Field Errors
 */
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new APIError(message, 400);
};

/**
 * Handle MongoDB Validation Errors
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new APIError(message, 400);
};

/**
 * Handle JWT Errors
 */
const handleJWTError = () =>
  new APIError('Invalid token. Please log in again!', 401);

/**
 * Handle JWT Expired Errors
 */
const handleJWTExpiredError = () =>
  new APIError('Your token has expired! Please log in again.', 401);

/**
 * Send Error Response in Development
 */
const sendErrorDev = (err, req, res) => {
  // Log error with stack trace in development
  console.error(colors.red.bold('🚨 ERROR DETAILS:'));
  console.error(colors.red(`📍 URL: ${req.method} ${req.originalUrl}`));
  console.error(colors.red(`📅 Time: ${new Date().toISOString()}`));
  console.error(colors.red(`💬 Message: ${err.message}`));
  console.error(colors.red(`📊 Status: ${err.statusCode || 500}`));
  console.error(colors.red('📋 Stack Trace:'));
  console.error(colors.gray(err.stack));
  console.error(colors.red('─'.repeat(80)));

  return res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

/**
 * Send Error Response in Production
 */
const sendErrorProd = (err, req, res) => {
  // Log error without sensitive information in production
  console.error(colors.red.bold('🚨 PRODUCTION ERROR:'));
  console.error(colors.red(`📍 URL: ${req.method} ${req.originalUrl}`));
  console.error(colors.red(`📅 Time: ${new Date().toISOString()}`));
  console.error(colors.red(`💬 Message: ${err.message}`));
  console.error(colors.red(`📊 Status: ${err.statusCode || 500}`));

  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error(colors.red('💥 PROGRAMMING ERROR!'), err);
  
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
    timestamp: new Date().toISOString()
  });
};

/**
 * Global Error Handler Middleware
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  } else {
    // Default to development mode if NODE_ENV is not set
    sendErrorDev(err, req, res);
  }
};

/**
 * Catch Async Errors Wrapper
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Handle Unhandled Routes
 */
const handleNotFound = (req, res, next) => {
  const err = new APIError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
};

module.exports = {
  APIError,
  globalErrorHandler,
  catchAsync,
  handleNotFound
}; 