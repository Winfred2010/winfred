const marioGame = {
  detail: "An amazing game!",
  characters: {
    mario: {
      description: "Small and jumpy. Likes princesses.",
      height: 10,
      weight: 3,
      speed: 12,
    },
    bowser: {
      description: "Big and green, Hates princesses.",
      height: 16,
      weight: 6,
      speed: 4,
    },
    princessPeach: {
      description: "Beautiful princess.",
      height: 12,
      weight: 2,
      speed: 2,
    }
  },
};

// 1. Convert JS object to JSON string
const marioJSON = JSON.stringify(marioGame);
console.log("JSON String:", marioJSON);

// 2. Pretty-print the JSON string (with 2 spaces of indentation)
const prettyMarioJSON = JSON.stringify(marioGame, null, 2);
console.log("Pretty-Printed JSON:", prettyMarioJSON);

// 3. Add a debugger breakpoint for the web inspector
debugger;