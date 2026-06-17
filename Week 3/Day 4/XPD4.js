/**
 * Arrow Functions & Ternary
 */
const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log(`Experience Points: ${experiencePoints}`);

/**
 * Is it a String?
 */
const isString = (val) => typeof val === 'string';

/**
 * One-line Sum
 */
const sum = (a, b) => a + b;

/**
 * Kg to Grams
 */
function toGrams(kg) { return kg * 1000; } 
const toGramsExp = function(kg) { return kg * 1000; }; 
const toGramsArrow = kg => kg * 1000;

/**
 * Fortune Teller
 */
((children, partner, location, job) => {
    const sentence = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    const p = document.createElement("p");
    p.textContent = sentence;
    document.body.appendChild(p);
})(2, "Alex", "Tokyo", "Developer");

/**
 * Navbar Welcome
 */
((username) => {
    const nav = document.querySelector(".navbar");
    if (nav) {
        const div = document.createElement("div");
        div.innerHTML = `<span>Welcome, ${username}</span> <img src="https://picsum.photos/30" style="border-radius:50%">`;
        nav.appendChild(div);
    }
})("John");

/**
 * Juice Bar
 */
function makeJuice(size) {
    const ingredients = [];

    const addIngredients = (ing1, ing2, ing3) => {
        ingredients.push(ing1, ing2, ing3);
    };

    const displayJuice = () => {
        const sentence = `The client wants a ${size} juice, containing: ${ingredients.join(", ")}.`;
        const div = document.createElement("div");
        div.textContent = sentence;
        document.body.appendChild(div);
    };

    addIngredients("Apple", "Ginger", "Lemon");
    addIngredients("Carrot", "Kale", "Mint");
    displayJuice();
}

makeJuice("large");