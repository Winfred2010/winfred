const express = require('express');
const app = express();

app.use(express.json());

// Game Data
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🎸', name: 'Guitar' }
];

let leaderboard = [];

// Helper: Get random game state
const getNewRound = () => {
    const correct = emojis[Math.floor(Math.random() * emojis.length)];
    let options = [correct.name];
    while (options.length < 4) {
        let rand = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(rand)) options.push(rand);
    }
    return { emoji: correct.emoji, options: options.sort(() => Math.random() - 0.5) };
};

// API Endpoints
app.get('/new-round', (req, res) => res.json(getNewRound()));

app.post('/guess', (req, res) => {
    const { emoji, guess } = req.body;
    const correct = emojis.find(e => e.emoji === emoji).name === guess;
    res.json({ correct });
});

// UI
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Emoji Guessing Game</title></head>
        <body style="text-align:center; font-family:sans-serif; padding-top:50px;">
            <h1>Emoji Challenge</h1>
            <div id="game">
                <div id="emoji-display" style="font-size:100px;"></div>
                <div id="options" style="margin:20px;"></div>
            </div>
            <h2>Score: <span id="score">0</span></h2>
            <p id="feedback"></p>

            <script>
                let score = 0;
                let currentEmoji = '';

                async function nextRound() {
                    const res = await fetch('/new-round');
                    const data = await res.json();
                    currentEmoji = data.emoji;
                    document.getElementById('emoji-display').innerText = currentEmoji;
                    document.getElementById('options').innerHTML = data.options.map(opt => 
                        \`<button onclick="checkGuess('\${opt}')" style="padding:10px 20px; margin:5px;">\${opt}</button>\`
                    ).join('');
                }

                async function checkGuess(guess) {
                    const res = await fetch('/guess', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ emoji: currentEmoji, guess })
                    });
                    const result = await res.json();
                    
                    if(result.correct) {
                        score++;
                        document.getElementById('feedback').innerText = "✅ Correct!";
                        document.getElementById('feedback').style.color = "green";
                    } else {
                        document.getElementById('feedback').innerText = "❌ Wrong!";
                        document.getElementById('feedback').style.color = "red";
                    }
                    
                    document.getElementById('score').innerText = score;
                    setTimeout(() => {
                        document.getElementById('feedback').innerText = "";
                        nextRound();
                    }, 800);
                }

                nextRound();
            </script>
        </body>
        </html>
    `);
});

app.listen(3000, () => console.log('Game running on http://localhost:3000'));
