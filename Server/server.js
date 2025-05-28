const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const mongoose = require('mongoose');







// uploadData.js
const fs = require('fs');
const { connectDB, Product } = require('./dbConnect');

async function uploadData() {
    try {
        await connectDB();

        // Read JSON file
        const rawData = fs.readFileSync('data.json');
        const products = JSON.parse(rawData);

        // Insert into DB
        const result = await Product.insertMany(products);
        console.log(`✅ Inserted ${result.length} products`);

    } catch (err) {
        console.error('❌ Error uploading data:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

connectDB();

uploadData();





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
