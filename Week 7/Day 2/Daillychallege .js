const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_management',
    password: 'password',
    port: 5432,
});

// --- ROUTES & CONTROLLERS ---

// POST /register - Uses Transaction
app.post('/register', async (req, res) => {
    const { email, username, first_name, last_name, password } = req.body;
    const client = await db.connect();

    try {
        await client.query('BEGIN');
        const hash = await bcrypt.hash(password, 10);

        // Insert into users
        const userRes = await client.query(
            'INSERT INTO users (email, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id',
            [email, username, first_name, last_name]
        );

        // Insert into hashpwd
        await client.query(
            'INSERT INTO hashpwd (username, password) VALUES ($1, $2)',
            [username, hash]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: "User registered", userId: userRes.rows[0].id });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

// POST /login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT password FROM hashpwd WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(404).send("User not found");

        const match = await bcrypt.compare(password, result.rows[0].password);
        match ? res.send("Login successful") : res.status(401).send("Invalid password");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /users
app.get('/users', async (req, res) => {
    const { rows } = await db.query('SELECT id, email, username, first_name, last_name FROM users');
    res.json(rows);
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    rows.length ? res.json(rows[0]) : res.status(404).send("User not found");
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
    const { email, first_name, last_name } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE users SET email=COALESCE($1, email), first_name=COALESCE($2, first_name), last_name=COALESCE($3, last_name) WHERE id=$4 RETURNING *',
            [email, first_name, last_name, req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('🚀 API running at http://localhost:3000'));
