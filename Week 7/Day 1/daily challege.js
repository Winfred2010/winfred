const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

// Game Data & State
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];

let gameState = {
  currentStep: 0,
  score: 0,
  lastFeedback: ""
};

// GET /quiz: Display current question
router.get('/', (req, res) => {
  if (gameState.currentStep >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const q = triviaQuestions[gameState.currentStep];
  res.send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
      <h1>Trivia Quiz</h1>
      <p style="color: blue;">${gameState.lastFeedback}</p>
      <h3>Question ${gameState.currentStep + 1} of ${triviaQuestions.length}</h3>
      <p style="font-size: 1.2em;">${q.question}</p>
      <form action="/quiz" method="POST">
        <input type="text" name="userAnswer" placeholder="Your answer" required autofocus>
        <button type="submit">Submit</button>
      </form>
    </div>
  `);
});

// POST /quiz: Process answer
router.post('/', (req, res) => {
  const { userAnswer } = req.body;
  const correctAnswer = triviaQuestions[gameState.currentStep].answer;

  if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()) {
    gameState.score++;
    gameState.lastFeedback = "✅ Correct!";
  } else {
    gameState.lastFeedback = `❌ Incorrect! The answer was ${correctAnswer}.`;
  }

  gameState.currentStep++;
  res.redirect('/quiz');
});

// GET /quiz/score: Final results
router.get('/score', (req, res) => {
  const finalScore = gameState.score;
  const total = triviaQuestions.length;
  
  // Reset for next play
  gameState = { currentStep: 0, score: 0, lastFeedback: "" };

  res.send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
      <h1>Quiz Finished!</h1>
      <h2>Your Score: ${finalScore} / ${total}</h2>
      <a href="/quiz" style="text-decoration: none; background: #333; color: white; padding: 10px 20px; border-radius: 5px;">Play Again</a>
    </div>
  `);
});

app.use('/quiz', router);

app.listen(3000, () => console.log('Trivia game at http://localhost:3000/quiz'));
