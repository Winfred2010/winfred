const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api_db',
    password: 'password',
    port: 5432,
});

// Blog Logic
app.get('/posts', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM posts');
    res.json(rows);
});

app.get('/posts/:id', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    rows[0] ? res.json(rows[0]) : res.status(404).send('Not found');
});

app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    const { rows } = await db.query('INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
    res.status(201).json(rows[0]);
});

app.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    const { rows } = await db.query('UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *', [title, content, req.params.id]);
    res.json(rows[0]);
});

app.delete('/posts/:id', async (req, res) => {
    await db.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.status(204).send();
});

// Book Logic
app.get('/api/books', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM books');
    res.json(rows);
});

app.get('/api/books/:id', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    rows[0] ? res.json(rows[0]) : res.status(404).json({ message: "Book not found" });
});

app.post('/api/books', async (req, res) => {
    const { title, author, publishedYear } = req.body;
    const { rows } = await db.query('INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *', [title, author, publishedYear]);
    res.status(201).json(rows[0]);
});

// Global Handlers
app.use((req, res) => res.status(404).send('Route not found'));
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

app.listen(3000, () => console.log('Server on 3000'));
