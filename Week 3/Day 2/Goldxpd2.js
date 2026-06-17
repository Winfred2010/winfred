// ==========================================
// 🚀 Exercise 1 : Is Blank
// ==========================================
console.group("Exercise 1: Is Blank");
const isBlank = (str) => str.trim().length === 0;

console.log("isBlank(''):", isBlank(''));       // true
console.log("isBlank('abc'):", isBlank('abc'));   // false
console.groupEnd();


// ==========================================
// 🚀 Exercise 2 : Abbreviate Name
// ==========================================
console.group("Exercise 2: Abbreviate Name");
function abbrevName(fullName) {
    const names = fullName.trim().split(" ");
    if (names.length > 1) {
        // Grabs first name and the first initial of the second word
        return `${names[0]} ${names[1].charAt(0).toUpperCase()}.`;
    }
    return fullName;
}

console.log("Abbreviated:", abbrevName("Robin Singh")); // "Robin S."
console.groupEnd();


// ==========================================
// 🚀 Exercise 3 : Swap Case
// ==========================================
console.group("Exercise 3: Swap Case");
function swapCase(str) {
    return str.split('')
              .map(char => (char === char.toUpperCase()) ? char.toLowerCase() : char.toUpperCase())
              .join('');
}

console.log("SwapCase:", swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'
console.groupEnd();


// ==========================================
// 🚀 Exercise 4 : Omnipresent Value
// ==========================================
console.group("Exercise 4: Omnipresent Value");
function isOmnipresent(arr, val) {
    // Returns true if every sub-array contains the target value
    return arr.every(subArr => subArr.includes(val));
}

console.log("isOmnipresent (1):", isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log("isOmnipresent (6):", isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false
console.groupEnd();


// ==========================================
// 🚀 Exercise 5 : Red Table Diagonal
// ==========================================
/**
 * This logic runs once the DOM is fully loaded.
 * It targets the diagonal cells of the first table found on the page.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.group("Exercise 5: Table Diagonal");
    
    const table = document.querySelector("table");
    
    if (table) {
        for (let i = 0; i < table.rows.length; i++) {
            // Check if the cell exists to prevent errors on non-square tables
            if (table.rows[i].cells[i]) {
                table.rows[i].cells[i].style.backgroundColor = "red";
                console.log(`Cell at diagonal [${i}:${i}] colored red.`);
            }
        }
    } else {
        console.warn("Table not found in the HTML. Exercise 5 skipped.");
    }
    
    console.groupEnd();
});