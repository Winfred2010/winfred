// ==================== DAILY CHALLENGE #1: Express Server ====================
// File: server/server.js
// Run with: npm start (or node server.js)

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Part I: GET request to /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

// Part II: POST request to /api/world
app.post('/api/world', (req, res) => {
  const userInput = req.body.message;
  console.log('Received from client:', userInput);

  res.json({
    message: `I received your POST request. This is what you sent me: ${userInput}`
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
