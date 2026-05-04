const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

// In-memory database
let posts = [];

// GET /posts: All posts
router.get('/', (req, res) => {
    res.json(posts);
});

// GET /posts/:id: Specific post
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
});

// POST /posts: Create post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        timestamp: new Date().toISOString()
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT /posts/:id: Update post
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    
    res.json(post);
});

// DELETE /posts/:id: Delete post
router.delete('/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts.splice(index, 1);
    res.status(204).send();
});

app.use('/posts', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog API running at http://localhost:${PORT}/posts`));
