const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

router.get('/', (req, res) => {
    const options = emojis.map(e => `<option value="${e}">${e}</option>`).join('');
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Emoji greeter</h1>
            <form action="/greet" method="POST">
                <input type="text" name="name" placeholder="Enter your name" required style="padding: 10px;">
                <select name="emoji" style="padding: 10px;">${options}</select>
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Greet Me!</button>
            </form>
        </div>
    `);
});

router.post('/greet', (req, res) => {
    const { name, emoji } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).send("Name is required! <a href='/'>Go back</a>");
    }
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px; background: #f0f0f0; padding: 20px; border-radius: 15px; display: inline-block;">
            <h1 style="color: #333;">Hello, ${name}! ${emoji}</h1>
            <a href="/" style="text-decoration: none; color: blue;">Try again</a>
        </div>
    `);
});

app.use('/', router);

app.listen(3000, () => console.log('Emoji App running at http://localhost:3000'));
