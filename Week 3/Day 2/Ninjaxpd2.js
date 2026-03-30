// ==========================================
// 🚀 Exercise 1: Random Even Numbers
// ==========================================
console.group("Exercise 1: Random Evens");
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random Number Generated: ${randomNumber}`);

for (let i = 0; i <= randomNumber; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
console.groupEnd();


// ==========================================
// 🚀 Exercise 2: Capitalized Letters
// ==========================================
console.group("Exercise 2: Capitalized Letters");
function capitalize(str) {
    // Helper to transform string based on index parity
    const transform = (isEven) => {
        return str.split('')
            .map((char, index) => (index % 2 === (isEven ? 0 : 1)) ? char.toUpperCase() : char.toLowerCase())
            .join('');
    };

    return [transform(true), transform(false)];
}

console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']
console.groupEnd();


// ==========================================
// 🚀 Exercise 3: Is Palindrome?
// ==========================================
console.group("Exercise 3: Palindrome");
function isPalindrome(str) {
    // Remove non-alphanumeric and lowercase for a robust check
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

console.log("Is 'kayak' a palindrome?", isPalindrome("kayak")); // true
console.log("Is 'hello' a palindrome?", isPalindrome("hello")); // false
console.groupEnd();


// ==========================================
// 🚀 Exercise 4: Biggest Number
// ==========================================
console.group("Exercise 4: Biggest Number");
function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) return 0;

    // Filter to keep only numbers, then find the max
    const numbersOnly = arrayNumber.filter(item => typeof item === 'number');
    
    if (numbersOnly.length === 0) return 0;
    
    return Math.max(...numbersOnly);
}

console.log("Array [-1, 0, 100]:", biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log("Array ['a', 3, 4, 2]:", biggestNumberInArray(['a', 3, 4, 2]));          // 4
console.log("Empty Array:", biggestNumberInArray([]));                               // 0
console.groupEnd();


// ==========================================
// 🚀 Exercise 5: Unique Elements
// ==========================================
console.group("Exercise 5: Unique Elements");
function getUniqueElements(arr) {
    // The 'Set' object automatically removes duplicates
    return [...new Set(arr)];
}

console.log("Unique [1,2,3,3,3,4,5]:", getUniqueElements([1, 2, 3, 3, 3, 3, 4, 5]));
console.groupEnd();


// ==========================================
// 🚀 Exercise 6: Calendar (DOM)
// ==========================================
function createCalendar(year, month) {
    // Month in JS Date is 0-indexed (0=Jan, 11=Dec)
    const mon = month - 1; 
    const d = new Date(year, mon);

    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.border = "1";

    // 1. Create Header Row
    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    let trHeader = document.createElement('tr');
    days.forEach(day => {
        let th = document.createElement('th');
        th.textContent = day;
        trHeader.appendChild(th);
    });
    table.appendChild(trHeader);

    let tr = document.createElement('tr');

    // 2. Spaces for the first week (getDays starts 0=Sun, so we adjust to Mon=0)
    let dayOfWeek = d.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7; // Sunday becomes 7

    for (let i = 1; i < dayOfWeek; i++) {
        tr.appendChild(document.createElement('td'));
    }

    // 3. Fill the actual days
    while (d.getMonth() === mon) {
        let td = document.createElement('td');
        td.textContent = d.getDate();
        td.style.textAlign = 'center';
        tr.appendChild(td);

        // If it's Sunday (day index 0), start a new row
        if (d.getDay() === 0) {
            table.appendChild(tr);
            tr = document.createElement('tr');
        }

        d.setDate(d.getDate() + 1);
    }

    // 4. Fill spaces for the last week
    if (d.getDay() !== 1) {
        let remaining = d.getDay() === 0 ? 0 : 8 - d.getDay();
        for (let i = 0; i < remaining; i++) {
            tr.appendChild(document.createElement('td'));
        }
    }

    table.appendChild(tr);
    document.body.appendChild(table);
}

// Initializing the DOM components
window.onload = () => {
    createCalendar(2012, 9);
};