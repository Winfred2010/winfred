const express = require('express');
const fs = require('fs/promises');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static(__dirname));

const getUsers = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveUsers = async (users) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
};

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: 'error1' });
    }

    const users = await getUsers();
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ message: 'error1' });
    }

    const passwordExists = await Promise.all(users.map(async (user) => bcrypt.compare(password, user.password)));
    if (passwordExists.some(match => match)) {
        return res.status(400).json({ message: 'error1' });
    }

    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        username,
        password: await bcrypt.hash(password, 10)
    };

    users.push(newUser);
    await saveUsers(users);
    res.status(201).json({ message: 'register' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'error2' });
    }

    const users = await getUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'error2' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'error2' });
    }

    res.json({ message: 'login' });
});

app.get('/users', async (req, res) => {
    res.json(await getUsers());
});

app.get('/users/:id', async (req, res) => {
    const users = await getUsers();
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const users = await getUsers();
    const index = users.findIndex(u => u.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const updatedUser = { ...users[index], ...req.body };
    if (req.body.password) {
        updatedUser.password = await bcrypt.hash(req.body.password, 10);
    }

    users[index] = updatedUser;
    await saveUsers(users);
    res.json(updatedUser);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

app.listen(3000, () => console.log('🚀 Server at http://localhost:3000/register.html'));
