// ==========================================
// Divisible by three
// ==========================================
let numbers = [123, 8409, 100053, 333333333, 7];

for (let num of numbers) {
    console.log(num % 3 === 0);
}


// ==========================================
// Attendance
// ==========================================
let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
};

let studentName = prompt("winfred:").toLowerCase();

if (studentName in guestList) {
    console.log(`Hi! I'm ${studentName}, and I'm from ${guestList[studentName]}.`);
} else {
    console.log("Hi! I'm a guest.");
}


// ==========================================
//  Playing with numbers
// ==========================================
let age = [20, 5, 12, 43, 98, 55];

// 1. Manual Sum
let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum += age[i];
}
console.log("Total Sum:", sum);

// 2. Manual Highest Age
let highest = age[0];
for (let i = 1; i < age.length; i++) {
    if (age[i] > highest) {
        highest = age[i];
    }
}
console.log("Highest Age:", highest);