// --- printFullName with Parameter Destructuring ---
function printFullName({ first, last }) {
    return `Your full name is ${first} ${last}`;
}
console.log(printFullName({ first: 'Elie', last: 'Schoppik' }));


// --- Keys and Values Sorted ---
function keysAndValues(obj) {
    // Get keys and sort them alphabetically
    const keys = Object.keys(obj).sort();
    
    // Map through the sorted keys to get values in the same order
    const values = keys.map(key => obj[key]);
    
    return [keys, values];
}

console.log(keysAndValues({ b: 2, a: 1, c: 3 })); 
// ➞ [["a", "b", "c"], [1, 2, 3]]
console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// ➞ [["a", "b", "c"], ["Apple", "Microsoft", "Google"]]


// ---  Counter Class Analysis ---

