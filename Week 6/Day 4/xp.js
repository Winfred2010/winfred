/**
 * NODE.JS EXERCISES COMBINED
 * Note: Exercises 2 & 4 originally used ES6 modules. 
 * For this single-file demo, I am using CommonJS syntax so it runs instantly with 'node'.
 */

const fs = require('fs');
const _ = require('lodash'); // Requires: npm install lodash

// === EXERCISE 1: Products (Search Logic) ===
const products = [
    { name: "Laptop", price: 1200, category: "Electronics" },
    { name: "Coffee Maker", price: 80, category: "Appliances" }
];

function findProduct(productName) {
    const item = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    item ? console.log(`[Ex 1] Found: ${item.name} - $${item.price}`) : console.log("[Ex 1] Not found");
}

// === EXERCISE 2: People (Average Age) ===
const people = [
    { name: "Alice", age: 25 }, { name: "Bob", age: 35 }
];

function printAvgAge() {
    const avg = people.reduce((s, p) => s + p.age, 0) / people.length;
    console.log(`[Ex 2] Average Age: ${avg}`);
}

// === EXERCISE 3 & 7: File Management ===
function handleFiles() {
    try {
        // Create source file
        fs.writeFileSync('source.txt', 'Hello World !!');
        
        // Read and Copy
        const content = fs.readFileSync('source.txt', 'utf8');
        fs.writeFileSync('destination.txt', content);
        
        // Write to another file as requested in Ex 3
        fs.writeFileSync('Bye World.txt', 'Writing to the file');
        
        console.log(`[Ex 3/7] File operations successful. Content: "${content}"`);
    } catch (err) {
        console.log("[Ex 3/7] File Error:", err.message);
    }
}

// === EXERCISE 4: Todo List Class ===
class TodoList {
    constructor() { this.tasks = []; }
    add(t) { this.tasks.push({ t, done: false }); }
    complete(i) { if(this.tasks[i]) this.tasks[i].done = true; }
    list() {
        console.log("[Ex 4] Todo List:");
        this.tasks.forEach(task => console.log(` - [${task.done ? 'X' : ' '}] ${task.t}`));
    }
}

// === EXERCISE 5: Math Logic ===
const math = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};

// === EXECUTION ===
console.log("--- STARTING ALL EXERCISES ---");

findProduct("Laptop");
printAvgAge();
handleFiles();

const myTodos = new TodoList();
myTodos.add("Finish Exercises");
myTodos.complete(0);
myTodos.list();

console.log(`[Ex 5] Math: 10*5 = ${math.multiply(10, 5)}`);
console.log(`[Ex 5] Lodash Random: ${_.random(1, 100)}`);

// Ex 6: Chalk (Note: Chalk v5+ is ESM only. Using a simple placeholder if not installed)
try {
    const chalk = require('chalk');
    console.log(chalk.green.bold("[Ex 6] Chalk is working in green!"));
} catch (e) {
    console.log("[Ex 6] Chalk not installed, printing plain text.");
}

console.log("--- ALL EXERCISES COMPLETE ---");
