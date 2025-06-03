# Express App API Testing Guide

## 📋 Overview
This guide explains how to test the Express App API using Postman and view the API documentation using Swagger.

## 🚀 Getting Started

### 1. Start the Express App
```bash
cd Server/TaskFiles
node expressApp.js
```
The server will start at `http://localhost:3000`

## 📮 Postman Testing

### Import Collection
1. Open Postman
2. Click "Import" button
3. Select `postman_collection.json` file
4. The collection "Express App API Collection" will be imported

### Available Tests
The collection includes 2 pre-configured requests:

#### **Home Route Test**
- **URL:** `GET http://localhost:3000/`
- **Expected Response:** "Hello from the Home Route!"
- **Automated Tests:**
  - Status code is 200
  - Response contains correct message
  - Response time < 200ms

#### **About Route Test**
- **URL:** `GET http://localhost:3000/about`
- **Expected Response:** "Hello from the About Route!"
- **Automated Tests:**
  - Status code is 200
  - Response contains correct message  
  - Response time < 200ms

### Environment Variables
The collection uses a variable `{{base_url}}` set to `http://localhost:3000`

### Running Tests
1. Select the entire collection
2. Click "Run" to execute all tests
3. View test results in the Collection Runner

## 📚 Swagger Documentation

### Viewing Documentation
1. Copy the contents of `swagger.json`
2. Go to [Swagger Editor](https://editor.swagger.io/)
3. Paste the JSON content
4. View the interactive API documentation

### Documentation Features
- **Interactive API Explorer:** Test endpoints directly from the browser
- **Request/Response Examples:** See expected inputs and outputs
- **Schema Definitions:** Understand data structures
- **Try It Out:** Execute API calls from the documentation

## 🔍 API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/` | Home route | "Hello from the Home Route!" |
| GET | `/about` | About route | "Hello from the About Route!" |

## 🧪 Testing Checklist

### Manual Testing
- [ ] Server starts successfully on port 3000
- [ ] Home route returns correct message
- [ ] About route returns correct message
- [ ] Logging middleware shows request details in console

### Postman Testing
- [ ] Collection imports successfully
- [ ] All tests pass for home route
- [ ] All tests pass for about route
- [ ] Response times are acceptable

### Swagger Documentation
- [ ] JSON validates in Swagger Editor
- [ ] All endpoints are documented
- [ ] Examples are accurate
- [ ] Try It Out feature works

## 📊 Expected Console Output
When testing, you should see logging output like:
```
[2024-01-15T10:30:00.000Z] Incoming: GET /
[2024-01-15T10:30:00.001Z] Completed: GET / - Status: 200 - Duration: 1ms
[2024-01-15T10:30:05.000Z] Incoming: GET /about
[2024-01-15T10:30:05.002Z] Completed: GET /about - Status: 200 - Duration: 2ms
```

## 🐛 Troubleshooting

### Common Issues
1. **Port 3000 already in use:** Kill the process or change the port
2. **Postman tests failing:** Ensure server is running first
3. **Swagger validation errors:** Check JSON syntax

### Quick Fixes
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill
```

## 📈 Next Steps
After successful testing, consider:
- Adding more test cases
- Implementing error handling tests
- Adding authentication endpoints
- Creating automated CI/CD tests 