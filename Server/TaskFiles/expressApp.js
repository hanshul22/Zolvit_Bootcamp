// expressApp.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
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
