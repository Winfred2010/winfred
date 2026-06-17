/**
 * 📝 MAD LIBS GAME
 */

const libForm = document.getElementById("libform");
const libButton = document.getElementById("lib-button");
const storySpan = document.getElementById("story");

// 1. Add a Shuffle Button to the DOM via JS (Bonus Requirement)
const shuffleBtn = document.createElement("button");
shuffleBtn.textContent = "Shuffle Story!";
shuffleBtn.id = "shuffle-button";
libForm.after(shuffleBtn); // Places it after the form

// 2. Global variable to store current words
let userWords = {};

// 3. Collection of story templates
const storyTemplates = [
    (w) => `Once upon a time, ${w.person} went to ${w.place} to ${w.verb} a ${w.adjective} ${w.noun}. It was legendary!`,
    (w) => `The ${w.adjective} ${w.noun} started to ${w.verb} right in front of ${w.person} at ${w.place}!`,
    (w) => `In the middle of ${w.place}, ${w.person} found a ${w.noun}. It looked so ${w.adjective} that they decided to ${w.verb} it immediately.`
];

/**
 * Core Function: Grabs values and generates the story
 */
const getMadLibValues = (event) => {
    event.preventDefault();

    // Retrieve input values
    const noun = document.getElementById("noun").value.trim();
    const adjective = document.getElementById("adjective").value.trim();
    const person = document.getElementById("person").value.trim();
    const verb = document.getElementById("verb").value.trim();
    const place = document.getElementById("place").value.trim();

    // Validation: Ensure no fields are empty
    if (!noun || !adjective || !person || !verb || !place) {
        alert("Please fill in all the blanks before libbing!");
        return;
    }

    // Store words in our global object
    userWords = { noun, adjective, person, verb, place };

    displayStory();
};

/**
 * Display Function: Picks a random story template
 */
const displayStory = () => {
    if (Object.keys(userWords).length === 0) {
        alert("Enter your words and click 'Lib it!' first!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * storyTemplates.length);
    const generatedStory = storyTemplates[randomIndex](userWords);
    
    storySpan.textContent = generatedStory;
};

// --- Event Listeners ---

// Main submission
libForm.addEventListener("submit", getMadLibValues);

// Shuffle functionality
shuffleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayStory();
});