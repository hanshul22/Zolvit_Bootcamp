# User Management API - MVC Architecture

This project implements a RESTful API for user management following the **Model-View-Controller (MVC)** architectural pattern.

## 🏗️ Project Structure

```
Server/
├── controllers/
│   └── userController.js     # Controller layer - Business logic
├── model/
│   └── userModel.js         # Model layer - Data structure and validation
├── Routes/
│   └── userRoutes.js        # Routes layer - HTTP request routing
├── DB/
│   └── db.js               # Database connection
├── server.js               # Main application entry point
└── README.md              # This documentation
```

## 🎯 MVC Pattern Implementation

### **Model (`userModel.js`)**
- Defines the user data structure using Mongoose schema
- Handles data validation rules
- Manages database interactions at the schema level

### **Controller (`userController.js`)**
- Contains all business logic for user operations
- Handles request processing and response formatting
- Manages error handling and validation
- Provides standardized response format

### **Routes (`userRoutes.js`)**
- Defines API endpoints and HTTP methods
- Maps routes to controller functions
- Handles middleware and route-level configurations

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/` | API information and available endpoints |
| POST   | `/api/users` | Create a new user |
| GET    | `/api/users` | Get all users |
| GET    | `/api/users/:id` | Get user by ID |
| PUT    | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |

## 📝 Request/Response Format

### Create User (POST `/api/users`)
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "createdAt": "2023-07-03T10:30:00.000Z",
    "__v": 0
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install express mongoose dotenv cors
   ```

2. **Environment Variables:**
   Create a `.env` file with:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. **Start the Server:**
   ```bash
   node server.js
   ```

4. **Test the API:**
   Visit `http://localhost:3000` to see available endpoints

## 🔧 Features

- ✅ Full CRUD operations for users
- ✅ Input validation and error handling
- ✅ Standardized response format
- ✅ CORS enabled for cross-origin requests
- ✅ Request logging middleware
- ✅ 404 and global error handling
- ✅ Environment-based configuration

## 📋 User Schema Validation

- **Name:** Required, minimum 2 characters, trimmed
- **Email:** Required, unique, valid email format, lowercase
- **Password:** Required, minimum 6 characters
- **CreatedAt:** Automatically set on creation

## 🏆 Benefits of MVC Pattern

1. **Separation of Concerns:** Each layer has a specific responsibility
2. **Maintainability:** Easy to modify business logic without affecting routes
3. **Testability:** Controllers can be tested independently
4. **Scalability:** Easy to add new features and endpoints
5. **Code Reusability:** Controllers can be reused across different routes

## 🔄 Next Steps

Consider adding:
- Authentication middleware
- User authentication (login/logout)
- Password hashing (bcrypt)
- Input sanitization
- Rate limiting
- API documentation (Swagger)
- Unit and integration tests 