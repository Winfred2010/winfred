const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { addDays, format } = require('date-fns');
const { faker } = require('@faker-js/faker');
const prompt = require('prompt-sync')();

// === EXERCISE 1: File Management & Path Manipulation ===
function getFileInfo() {
    const dataDir = path.join(__dirname, 'data');
    const filePath = path.join(dataDir, 'example.txt');

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, 'Hello Exercise 1!');

    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`[Ex 1] File Exists: Yes | Size: ${stats.size} bytes | Created: ${stats.birthtime}`);
    }
}

// === EXERCISE 2: Fetching Data with Axios ===
async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('[Ex 2] First 3 Post Titles:');
        response.data.slice(0, 3).forEach(post => console.log(` - ${post.title}`));
    } catch (err) {
        console.error('[Ex 2] Fetch Error:', err.message);
    }
}

// === EXERCISE 3: Date Operations (date-fns) ===
function runDateOps() {
    const now = new Date();
    const futureDate = addDays(now, 5);
    console.log(`[Ex 3] Current Date: ${format(now, 'yyyy-MM-dd')}`);
    console.log(`[Ex 3] Date + 5 Days: ${format(futureDate, 'PPPP')}`);
}

// === EXERCISE 4: Faker Module & User Input ===
const users = [];
function addFakeUser() {
    users.push({
        name: faker.person.fullName(),
        street: faker.location.streetAddress(),
        country: faker.location.country()
    });
}

function promptForUser() {
    const name = prompt('Enter your name: ');
    const street = prompt('Enter your street: ');
    const country = prompt('Enter your country: ');
    users.push({ name, street, country });
    console.log('[Ex 4] Current User List:', users);
}

// === EXERCISE 5: Regex #1 (Extract Numbers) ===
const returnNumbers = (str) => str.replace(/\D/g, '');

// === EXERCISE 6: Regex #2 (Name Validation) ===
function validateFullName(name) {
    // Only letters, exactly one space, Title Case
    const regex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    return regex.test(name);
}

// === EXECUTION ===
(async () => {
    console.log("--- NODE.JS EXERCISES ---");
    
    getFileInfo();
    runDateOps();
    
    const numString = 'k5k3q2g5z6x9bn';
    console.log(`[Ex 5] Extract from ${numString}: ${returnNumbers(numString)}`);
    
    const testName = "John Doe";
    console.log(`[Ex 6] Is "${testName}" valid? ${validateFullName(testName)}`);

    addFakeUser();
    console.log('[Ex 4] Added 1 fake user.');

    await fetchPosts();
    
    // Uncomment the line below to test interactive prompt
    // promptForUser();
    
    console.log("--- FINISHED ---");
})();
