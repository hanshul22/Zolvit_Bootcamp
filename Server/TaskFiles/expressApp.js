// expressApp.js
const express = require('express');
const app = express();
const port = 3000;

// Enhanced middleware to log requests with response details
app.use((req, res, next) => {
    const start = Date.now();
    
    // Log the incoming request
    console.log(`[${new Date().toISOString()}] Incoming: ${req.method} ${req.url}`);
    
    // Override res.end to log response details
    const originalEnd = res.end;
    res.end = function(...args) {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] Completed: ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
        originalEnd.apply(this, args);
    };
    
    next();
});

// Route 1
app.get('/', (req, res) => {
    res.send('Hello from the Home Route!');
});

// Route 2
app.get('/about', (req, res) => {
    res.send('Hello from the About Route!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
