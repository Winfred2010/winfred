const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const DATA_PATH = path.join(__dirname, 'tasks.json');
const router = express.Router();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'taskmanagement.html'));
});

// Simplified Helpers
async function readTasks() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch {
        return []; // If file doesn't exist, return empty array
    }
}

async function saveTasks(tasks) {
    await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
}

// --- Router Implementation ---

// GET /tasks: Retrieve all tasks
router.get('/', async (req, res) => {
    res.json(await readTasks());
});

// GET /tasks/:id: Retrieve a specific task
router.get('/:id', async (req, res) => {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id == req.params.id);
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
});

// POST /tasks: Create a new task
router.post('/', async (req, res) => {
    const { title, completed } = req.body;
    
    // Validation
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "Title is required and must be a string" });
    }

    const tasks = await readTasks();
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: completed === true
    };

    tasks.push(newTask);
    await saveTasks(tasks);
    res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task
router.put('/:id', async (req, res) => {
    const tasks = await readTasks();
    const idx = tasks.findIndex(t => t.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Task not found" });

    const { title, completed } = req.body;
    if (title !== undefined) tasks[idx].title = title;
    if (completed !== undefined) tasks[idx].completed = completed === true;

    await saveTasks(tasks);
    res.json(tasks[idx]);
});

// DELETE /tasks/:id: Delete a task
router.delete('/:id', async (req, res) => {
    const tasks = await readTasks();
    const filtered = tasks.filter(t => t.id != req.params.id);
    
    if (tasks.length === filtered.length) return res.status(404).json({ error: "Task not found" });

    await saveTasks(filtered);
    res.status(204).send();
});

// Mount the router
app.use('/tasks', router);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error - Check logs" });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
