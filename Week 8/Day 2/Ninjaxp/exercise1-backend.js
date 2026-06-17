// ==================== EXERCISE 1: Express Backend ====================
// File: server.js (Backend)
// Run with: PORT=3001 npm start

const express = require('express');
const app = express();

app.use(express.json());

// Enable CORS for React frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Users route
app.get('/users', (req, res) => {
  res.json([
    { id: 1, username: 'somebody' },
    { id: 2, username: 'somebody_else' }
  ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
