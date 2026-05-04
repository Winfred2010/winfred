const express = require('express');
const { Pool } = require('pg');

const app = express();
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'quiz_db',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/api/questions', async (req, res) => {
    try {
        const { rows } = await db.query(`
            SELECT q.id, q.question, q.correct_answer, array_agg(o.option_text) as options
            FROM questions q
            JOIN questions_options qo ON q.id = qo.question_id
            JOIN options o ON qo.option_id = o.id
            GROUP BY q.id
        `);
        res.json(rows);
    } catch (err) { res.status(500).send(err.message); }
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <body style="text-align:center; font-family:sans-serif;">
            <div id="quiz"><h2>Loading...</h2></div>
            <script>
                let idx = 0, score = 0, data = [];
                async function load() {
                    data = await (await fetch('/api/questions')).json();
                    render();
                }
                function render() {
                    if (idx >= data.length) {
                        document.body.innerHTML = "<h1>Final Score: " + score + "/" + data.length + "</h1>";
                        return;
                    }
                    const q = data[idx];
                    let html = "<h3>" + q.question + "</h3>";
                    q.options.forEach(opt => {
                        html += "<button onclick='check(\\"" + opt + "\\",\\"" + q.correct_answer + "\\")'>" + opt + "</button>";
                    });
                    document.getElementById('quiz').innerHTML = html;
                }
                function check(choice, correct) {
                    if (choice === correct) score++;
                    idx++;
                    render();
                }
                load();
            </script>
        </body>
        </html>
    `);
});

app.listen(3000, () => console.log('Quiz at http://localhost:3000'));
