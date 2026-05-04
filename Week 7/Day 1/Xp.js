const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// --- IN-MEMORY DATABASES ---
const todos = [];
const books = [];

// ==========================================
// EXERCISE 1: STATIC ROUTES (Home & About)
// ==========================================
const mainRouter = express.Router();

mainRouter.get('/', (req, res) => res.send('<h1>Welcome to the Homepage</h1>'));
mainRouter.get('/about', (req, res) => res.send('<h1>About Us</h1><p>We are building Express APIs!</p>'));

// ==========================================
// EXERCISE 2: TODO LIST API (CRUD)
// ==========================================
const todoRouter = express.Router();

todoRouter.get('/', (req, res) => res.json(todos));

todoRouter.post('/', (req, res) => {
    const newTodo = { id: todos.length + 1, task: req.body.task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

todoRouter.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    todo.task = req.body.task || todo.task;
    res.json(todo);
});

todoRouter.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Todo not found');
    todos.splice(index, 1);
    res.status(204).send();
});

// ==========================================
// EXERCISE 3: BOOK MANAGEMENT API (CRUD)
// ==========================================
const bookRouter = express.Router();

bookRouter.get('/', (req, res) => res.json(books));

bookRouter.post('/', (req, res) => {
    const newBook = { id: books.length + 1, title: req.body.title, author: req.body.author };
    books.push(newBook);
    res.status(201).json(newBook);
});

bookRouter.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

bookRouter.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Book not found');
    books.splice(index, 1);
    res.status(204).send();
});

// ==========================================
// MOUNTING ROUTERS
// ==========================================
app.use('/', mainRouter);
app.use('/todos', todoRouter);
app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`- Homepage: http://localhost:${PORT}/`);
    console.log(`- Todos API: http://localhost:${PORT}/todos`);
    console.log(`- Books API: http://localhost:${PORT}/books`);
});
