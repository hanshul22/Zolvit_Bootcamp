const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Home</title></head>
      <body><h1>Welcome to the Homepage</h1></body>
    </html>
  `);
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hello from the server' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


const eventsLogger = require('./TaskFiles/eventsLogger');

// Register listeners once at app start
eventsLogger.registerListeners();

// Simulate user actions:
eventsLogger.logEvent('userLogin', 'alice');
eventsLogger.logEvent('itemPurchased', { username: 'alice', itemName: 'Pro Plan' });
eventsLogger.logEvent('userLogout', 'alice');
