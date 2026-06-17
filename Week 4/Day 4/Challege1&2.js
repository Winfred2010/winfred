// --- 1st Daily Challenge ---
const makeAllCaps = (words) => new Promise((resolve, reject) => {
    words.every(w => typeof w === 'string') 
        ? resolve(words.map(w => w.toUpperCase())) 
        : reject("Error: Not all items are strings");
});

const sortWords = (words) => new Promise((resolve, reject) => {
    words.length > 4 
        ? resolve([...words].sort()) 
        : reject("Error: Array too short");
});

// --- 2nd Daily Challenge ---
const toJs = () => new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    Object.keys(morseJS).length === 0 ? reject("Error: Morse object is empty") : resolve(morseJS);
});

const toMorse = (morseJS) => new Promise((resolve, reject) => {
    const input = prompt("Enter a word or sentence:").toLowerCase().replace(/\s/g, "");
    const translation = [];
    
    for (const char of input) {
        if (morseJS[char]) {
            translation.push(morseJS[char]);
        } else {
            return reject(`Error: Character "${char}" does not exist in Morse.`);
        }
    }
    resolve(translation);
});

const joinWords = (morseTranslation) => {
    // Joining by line break as requested
    const displayResult = morseTranslation.join("<br>");
    document.body.innerHTML += `<div>${displayResult}</div>`;
};

// Chain
toJs()
    .then(obj => toMorse(obj))
    .then(arr => joinWords(arr))
    .catch(err => console.log(err));
