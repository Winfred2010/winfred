const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// ==========================================
// DATA SIMULATION (Database)
// ==========================================
let blogPosts = [
    { id: 1, title: "My First Trip", content: "It was amazing!" },
    { id: 2, title: "Node.js Tips", content: "Express makes APIs easy." }
];

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
    { id: 2, title: "1984", author: "George Orwell", publishedYear: 1949 }
];

// ==========================================
// EXERCISE 1: Blog API (RESTful)
// ==========================================

// GET all posts
app.get('/posts', (req, res) => res.json(blogPosts));

// GET specific post
app.get('/posts/:id', (req, res) => {
    const post = blogPosts.find(p => p.id === parseInt(req.params.id));
    post ? res.json(post) : res.status(404).send('Post not found');
});

// POST new post
app.post('/posts', (req, res) => {
    const newPost = { id: blogPosts.length + 1, ...req.body };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// PUT update post
app.put('/posts/:id', (req, res) => {
    const post = blogPosts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
});

// DELETE post
app.delete('/posts/:id', (req, res) => {
    blogPosts = blogPosts.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
});

// ==========================================
// EXERCISE 2: Book API (CRUD)
// ==========================================

// Read all books
app.get('/api/books', (req, res) => res.json(books));

// Read one book
app.get('/api/books/:bookId', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.bookId));
    book ? res.status(200).json(book) : res.status(404).json({ message: "Book not found" });
});

// Create book
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// ==========================================
// EXERCISE 3: External Data Service (Axios)
// ==========================================

const dataService = {
    fetchPosts: async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    }
};

app.get('/api/external-posts', async (req, res) => {
    try {
        const externalData = await dataService.fetchPosts();
        console.log('Data successfully retrieved from JSONPlaceholder');
        res.json(externalData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch external data" });
    }
});

// ==========================================
// ERROR HANDLING & SERVER START
// ==========================================

// 404 handler for invalid routes
app.use((req, res) => res.status(404).send('Route not found'));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`--- Server running on port ${PORT} ---`);
    console.log(`Blog API: http://localhost:${PORT}/posts`);
    console.log(`Book API: http://localhost:${PORT}/api/books`);
    console.log(`External API: http://localhost:${PORT}/api/external-posts`);
});
