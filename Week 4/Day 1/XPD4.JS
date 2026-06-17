/* JavaScript Array Methods Portfolio
    TOPICS: forEach, Map, Filter, Reduce, and Chaining
*/

// --- COLORS & CONDITIONALS (forEach, includes) ---
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// Displaying colors with simple numbering
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// Checking for existence
console.log(colors.includes("Violet") ? "Yeah" : "No...");


// --- ORDINAL SUFFIXES (forEach, ternary operator) ---
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    const num = index + 1;
    // Use specific suffix for 1, 2, 3; otherwise use "th"
    const suffix = (num <= 3) ? ordinal[num] : ordinal[0];
    console.log(`${num}${suffix} choice is ${color}.`);
});


// ---USER MANAGEMENT (map, filter, chaining) ---
const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

//  Transform objects into a new array of strings
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log("Welcome Messages:", welcomeStudents);

//  Create a subset based on role
const residents = users.filter(user => user.role === 'Full Stack Resident');
console.log("Full Stack Residents:", residents);

// Chaining: Filter first, then map the result to get just the last names
const residentsLastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);
console.log("Resident Last Names:", residentsLastNames);


// --- STRING AGGREGATION (reduce & join) ---
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

//  Using reduce (educational - demonstrates how reduce works)
// FIXED: Added initial value '' and conditional to prevent leading space
const storyReduce = epic.reduce((accumulator, currentValue) => {
    return accumulator ? `${accumulator} ${currentValue}` : currentValue;
}, '');
console.log("The Story (reduce):", storyReduce);

// Using join() (RECOMMENDED - cleaner and more efficient)
// This is the best practice for concatenating strings with a separator
const storyJoin = epic.join(' ');
console.log("The Story (join):", storyJoin);

// Both output: "a long time ago in a galaxy far far away"


// --- STUDENT SUCCESS (filter, forEach) ---
const students = [
    {name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}
];

// Filter students who passed and congratulate them
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
    });