const express = require('express');
const app = express();

app.use(express.json());

// In-memory data
const questions = [
    { id: 1, q: "What is 2 + 2?", options: ["3", "4", "5"], correct: "4" },
    { id: 2, q: "What is the capital of France?", options: ["London", "Paris", "Berlin"], correct: "Paris" },
    { id: 3, q: "Is Node.js single-threaded?", options: ["Yes", "No"], correct: "Yes" }
];

// Serve HTML directly for simplicity
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Quiz Game</title></head>
        <body>
            <div id="quiz"></div>
            <button onclick="submitAnswer()">Submit</button>
            <p id="feedback"></p>
            <script>
                let currentIdx = 0;
                let score = 0;
                const questions = ${JSON.stringify(questions)};

                function showQuestion() {
                    if (currentIdx >= questions.length) {
                        document.body.innerHTML = "<h1>Quiz Over! Score: " + score + "/" + questions.length + "</h1>";
                        return;
                    }
                    const q = questions[currentIdx];
                    let html = "<h3>" + q.q + "</h3>";
                    q.options.forEach(opt => {
                        html += "<input type='radio' name='opt' value='" + opt + "'>" + opt + "<br>";
                    });
                    document.getElementById('quiz').innerHTML = html;
                }

                function submitAnswer() {
                    const selected = document.querySelector('input[name="opt"]:checked');
                    if (!selected) return alert("Select an answer!");
                    
                    if (selected.value === questions[currentIdx].correct) {
                        score++;
                        document.getElementById('feedback').innerText = "Correct!";
                    } else {
                        document.getElementById('feedback').innerText = "Wrong!";
                    }
                    
                    currentIdx++;
                    setTimeout(() => {
                        document.getElementById('feedback').innerText = "";
                        showQuestion();
                    }, 1000);
                }
                showQuestion();
            </script>
        </body>
        </html>
    `);
});

app.listen(3000, () => console.log('Quiz running on http://localhost:3000'));
