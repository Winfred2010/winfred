// ---  Analysis ---
// Output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coord: {
            lat: 49.2827,
            lon: -123.1207
        }
    }
};

const { name, location: { country, city, coord: { lat, lon } } } = person;
console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lon})`);

// --- Display Student Info ---
function displayStudentInfo(objUser) {
    const { first, last } = objUser;
    return `Your full name is ${first} ${last}`;
}
console.log(displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));

// ---  User & ID ---
const users = { user1: 18273, user2: 92833, user3: 90315 };
//  Object to Array
const usersArray = Object.entries(users);
//  Multiply IDs by 2
const modifiedUsers = usersArray.map(([user, id]) => [user, id * 2]);
console.log("Modified Users:", modifiedUsers);

// ---  Person Class Analysis ---
// Output: "object" (Instances of classes are objects)

// ---  Dog Class ---
// Correct Answer: Option 2 (It uses super(name) before accessing this)

// --- Challenges ---
// 1. [2] === [2] is FALSE
// 2. {} === {} is FALSE

// Property Values Analysis:
// object2.number = 4 (Points to object1)
// object3.number = 4 (Points to object1)
// object4.number = 5 (It is a separate object)

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    sound(noise) {
        return `${noise} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));
