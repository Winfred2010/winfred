const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const config = require('../config');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize with empty array if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
}

class UserStore {
  constructor() {
    this.users = readUsers();
  }

  _save() {
    writeUsers(this.users);
  }

  findAll() {
    // Return users without sensitive data
    return this.users.map(({ password, refreshToken, ...user }) => user);
  }

  findById(id) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }

  findByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findByUsername(username) {
    return this.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
  }

  async create(userData) {
    const { username, email, password, role = 'user' } = userData;

    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

    const newUser = {
      id: uuidv4(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      refreshToken: null,
      profile: {
        fullName: '',
        bio: '',
        avatar: '',
      },
    };

    this.users.push(newUser);
    this._save();

    const { password: _, refreshToken: __, ...safeUser } = newUser;
    return safeUser;
  }

  async validatePassword(email, plainPassword) {
    const user = this.findByEmail(email);
    if (!user) return false;
    return bcrypt.compare(plainPassword, user.password);
  }

  updateRefreshToken(userId, refreshToken) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return false;

    this.users[index].refreshToken = refreshToken;
    this.users[index].updatedAt = new Date().toISOString();
    this._save();
    return true;
  }

  updateProfile(userId, profileData) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    const allowedFields = ['username', 'email', 'profile'];
    allowedFields.forEach((field) => {
      if (profileData[field] !== undefined) {
        if (field === 'profile') {
          this.users[index].profile = { ...this.users[index].profile, ...profileData[field] };
        } else {
          this.users[index][field] = profileData[field];
        }
      }
    });

    this.users[index].updatedAt = new Date().toISOString();
    this._save();

    const { password, refreshToken, ...safeUser } = this.users[index];
    return safeUser;
  }

  clearRefreshToken(userId) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return false;

    this.users[index].refreshToken = null;
    this.users[index].updatedAt = new Date().toISOString();
    this._save();
    return true;
  }
}

module.exports = new UserStore();
