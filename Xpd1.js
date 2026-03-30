// ==========================================
// People Array
// ==========================================
const people = ["Greg", "Mary", "Devon", "James"];

//  Review about arrays
people.shift(); // Removes "Greg"
people[people.indexOf("James")] = "Jason"; // Replaces "James" with "Jason"
people.push("luvai"); // Adds your name (Replace "YourName" with your actual name)

console.log("Mary's index:", people.indexOf("Mary"));

// Copy excluding "Mary" and "YourName"
// people is now ["Mary", "Devon", "Jason", "YourName"]
const peopleCopy = people.slice(1, 3); 
console.log("Array Copy:", peopleCopy);

console.log("Index of Foo:", people.indexOf("Foo")); // Returns -1 because "Foo" is not in the array

const last = people[people.length - 1];
console.log("Last element:", last);

// Part II - Loops
console.log("--- Iterating through people ---");
for (const person of people) {
    console.log(person);
}

console.log("--- Iterating until Devon ---");
for (const person of people) {
    console.log(person);
    if (person === "Devon") break;
}


// ==========================================
// Your favorite colors
// ==========================================
const colors = ["blue", "red", "green", "black", "white"];
const suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
    const num = i + 1;
    const suffix = suffixes[i];
    console.log(`My ${num}${suffix} choice is ${colors[i]}`);
}


// ==========================================
// Repeat the question
// ==========================================
// Note: Uncomment the code below to test in a browser environment
/*
let userNumber;
while (true) {
    userNumber = prompt("Please enter a number:");
    if (Number(userNumber) >= 10) break;
}
console.log("Number is valid:", userNumber);
*/


// ==========================================
// Building Management
// ==========================================
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
};

console.log("Number of floors:", building.numberOfFloors);
console.log("Apts on Floor 1 & 3:", building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1];
const rooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`Second tenant is ${secondTenant} with ${rooms} rooms.`);

const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if ((sarahRent + davidRent) > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent updated to:", building.numberOfRoomsAndRent.dan[1]);
}


// ==========================================
// Family
// ==========================================
const family = { father: "John", mother: "Jane", son: "Doe" };

console.log("Family Keys:");
for (let key in family) {
    console.log(key);
}

console.log("Family Values:");
for (let key in family) {
    console.log(family[key]);
}


// ==========================================
// Rudolf
// ==========================================
const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
};

let result = "";
for (let key in details) {
    result += `${key} ${details[key]} `;
}
console.log(result.trim());


// ==========================================
// Secret Group
// ==========================================
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
const societyName = names
    .map(name => name[0])
    .sort()
    .join("");

console.log("Secret Society Name:", societyName);