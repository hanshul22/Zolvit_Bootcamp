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
