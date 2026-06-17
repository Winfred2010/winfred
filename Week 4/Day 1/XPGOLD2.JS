/* *  Array Methods & String Manipulation
 */
// --- Sum of Array Elements (using reduce) ---
const sumArray = (arr) => (Array.isArray(arr) ? arr.reduce((acc, num) => acc + num, 0) : 0);

console.log("Exercise 1 - Sum:", sumArray([1, 2, 3, 4, 5]));


// --- Remove Duplicates (using Set) ---
const removeDuplicates = (arr) => [...new Set(arr)];

console.log("Exercise 2 - Unique:", removeDuplicates([1, 2, 2, 3, 4, 4, 5]));


// --- Remove Falsy Values ---
const removeFalsyValues = (arr) => arr.filter(Boolean);

console.log("Exercise 3 - Truthy Only:", removeFalsyValues([NaN, 0, 15, false, -22, '', undefined, 47, null]));


// --- Repeat String ---
const repeat = (str, times = 1) => str.repeat(times);

console.log("Exercise 4 - Repeat:", repeat('Ha!', 3));


// --- Turtle & Rabbit Alignment ---
const startLine = '     ||<- Start line';
let turtle = '🐢'.padStart(7, ' '); // Aligns the emoji right before the '||'
let rabbit = '🐇'.padStart(7, ' ');

console.log("Exercise 5 - Race Alignment:");
console.log(startLine);
console.log(turtle);
console.log(rabbit);


// ---  Turtle Transformation Analysis ---
let testTurtle = '🐢';
// trim() removes whitespace; padEnd adds '=' until the string length is 9
let transformed = testTurtle.trim().padEnd(9, '=');

console.log("Bonus - Transformed:", transformed); // Output: "🐢======="