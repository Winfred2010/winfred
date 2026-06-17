const age: number = 30;
const name: string = "John";
let id: string | number = "A-101";

const checkNumber = (num: number): string => 
    num > 0 ? "positive" : num < 0 ? "negative" : "zero";

const getDetails = (name: string, age: number): [string, number, string] => 
    [name, age, `Hello, ${name}! You are ${age} years old.`];

type Person = { name: string; age: number };
const createPerson = (name: string, age: number): Person => {
    const newPerson: Person = { name, age };
    return newPerson;
};

const inputElement = document.getElementById("user-input");
if (inputElement instanceof HTMLInputElement) inputElement.value = "Hello TypeScript!";

function getAction(role: string): string {
    switch (role) {
        case "admin": return "Manage users and settings";
        case "editor": return "Edit content";
        case "viewer": return "View content";
        case "guest": return "Limited access";
        default: return "Invalid role";
    }
}

function greet(): string;
function greet(name: string): string;
function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}
