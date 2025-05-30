const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
const userRoutes = require('./Routes/userRoutes');

const connectDB = require('./DB/db');

connectDB();

app.use(express.json());


app.use('/users', userRoutes);


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
