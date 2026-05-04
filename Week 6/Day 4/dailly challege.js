const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// --- Task 1: Basic Module System ---
const greet = (name) => `Hello, ${name}! Welcome to the Node.js Challenge.`;

// --- Task 2: Using an NPM Module ---
const displayColorfulMessage = () => {
    console.log(chalk.bold.blue('--- This is a vibrant blue message! ---'));
};

// --- Task 3: Advanced File Operations ---
const readFileContent = () => {
    const filePath = path.join(__dirname, 'files', 'file-data.txt');
    
    // Create directory and file if they don't exist for demo purposes
    if (!fs.existsSync(path.join(__dirname, 'files'))) {
        fs.mkdirSync(path.join(__dirname, 'files'));
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'This is the content from file-data.txt.');
    }

    const data = fs.readFileSync(filePath, 'utf8');
    console.log(chalk.yellow('File Content:'), data);
};

// --- Challenge Task: Integrating Everything ---
const runChallenge = () => {
    // 1. Greet
    console.log(greet('Developer'));

    // 2. Colorful Message
    displayColorfulMessage();

    // 3. Read File
    readFileContent();
};

runChallenge();
