const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// 1. CONFIG: Database Connection
// Update these credentials with your local Postgres settings
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_db',
    password: 'password',
    port: 5432,
});

// 2. CONTROLLERS & ROUTES (Combined for single-file simplicity)

// POST /api/todos: Create a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });
        const result = await db.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
            [title]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/todos: Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/todos/:id: Get specific todo
app.get('/api/todos/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Todo not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/todos/:id: Update a todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const result = await db.query(
            'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
            [title, completed, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Todo not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/todos/:id: Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Todo not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. ERROR HANDLING
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// 4. START SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Todo API running on http://localhost:${PORT}`);
});

/* 
SQL TABLE SETUP:
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);
*/
