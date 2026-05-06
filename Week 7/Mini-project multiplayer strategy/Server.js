const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const BOARD_SIZE = 10;
const BASES = {
  p1: { x: 0, y: 0 },
  p2: { x: 9, y: 9 }
};

const getInitialState = () => ({
  turn: 'p1',
  winner: null,
  players: {
    p1: { x: 0, y: 0, name: 'Blue Team' },
    p2: { x: 9, y: 9, name: 'Red Team' }
  },
  obstacles: [
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 7, y: 6 }, { x: 7, y: 7 }, { x: 4, y: 5 }, { x: 5, y: 4 }
  ]
});

let gameState = getInitialState();

app.use(express.json());
app.use(express.static(__dirname));

const isWithinBounds = (x, y) => x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
const isObstacle = (x, y) => gameState.obstacles.some(o => o.x === x && o.y === y);
const isAdjacentToOpponentBase = (playerKey) => {
  const opponentBase = BASES[playerKey === 'p1' ? 'p2' : 'p1'];
  const current = gameState.players[playerKey];
  return Math.abs(current.x - opponentBase.x) + Math.abs(current.y - opponentBase.y) === 1;
};

app.get('/api/game/status', (req, res) => res.json(gameState));
app.get('/api/game/winner', (req, res) => res.json({ winner: gameState.winner }));
app.post('/api/game/start', (req, res) => {
  gameState = getInitialState();
  res.json(gameState);
});

app.post('/api/game/move', (req, res) => {
  const { direction } = req.body;
  if (gameState.winner) return res.status(400).json({ message: 'Game already finished.' });

  const playerKey = gameState.turn;
  const player = gameState.players[playerKey];
  const next = { x: player.x, y: player.y };

  if (direction === 'up') next.y -= 1;
  else if (direction === 'down') next.y += 1;
  else if (direction === 'left') next.x -= 1;
  else if (direction === 'right') next.x += 1;
  else return res.status(400).json({ message: 'Invalid direction.' });

  if (!isWithinBounds(next.x, next.y)) return res.status(400).json({ message: 'Cannot move outside the board.' });
  if (isObstacle(next.x, next.y)) return res.status(400).json({ message: 'Obstacle blocks the way.' });

  const opponentKey = playerKey === 'p1' ? 'p2' : 'p1';
  const opponent = gameState.players[opponentKey];
  if (next.x === opponent.x && next.y === opponent.y) return res.status(400).json({ message: 'Cannot move into the opponent.' });

  player.x = next.x;
  player.y = next.y;

  const opponentBase = BASES[opponentKey];
  if (player.x === opponentBase.x && player.y === opponentBase.y) {
    gameState.winner = playerKey;
  }

  gameState.turn = opponentKey;
  res.json(gameState);
});

app.post('/api/game/attack', (req, res) => {
  const playerKey = gameState.turn;
  if (gameState.winner) return res.status(400).json({ message: 'Game already finished.' });
  if (!isAdjacentToOpponentBase(playerKey)) return res.status(400).json({ message: 'You are not adjacent to the opponent base.' });

  gameState.winner = playerKey;
  gameState.turn = null;
  res.json(gameState);
});

app.post('/api/game/reset', (req, res) => {
  gameState = getInitialState();
  res.json(gameState);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => console.log(`?? Play at http://localhost:${PORT}`));
