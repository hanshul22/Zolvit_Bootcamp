const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const User = require('./model/userModel');

const connectDB = require('./DB/db');

connectDB();

app.use(express.json());
// Example route to create a user (for testing)



app.post('/users', async (req, res) => {
  try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});




app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Home</title></head>
      <body><h1>Welcome to the Homepage</h1></body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});