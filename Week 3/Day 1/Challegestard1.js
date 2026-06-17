// ==========================================
// 🚀 Daily Challenge: Replace "not...bad"
// ==========================================
const sentence = "The movie is not that bad, I like it";

const wordNot = sentence.indexOf("not");
const wordBad = sentence.indexOf("bad");

if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    // We replace the substring from the start of 'not' to the end of 'bad' (+3)
    const toReplace = sentence.substring(wordNot, wordBad + 3);
    const result = sentence.replace(toReplace, "good");
    console.log("Challenge 1 Result:", result);
} else {
    console.log("Challenge 1 Result:", sentence);
}


// ==========================================
// 🚀 Daily Challenge: Star Pattern
// ==========================================

// Method 1: Using One Loop (with .repeat)
console.log("\n--- One Loop Pattern ---");
for (let i = 1; i <= 6; i++) {
    console.log("* ".repeat(i).trim());
}

// Method 2: Using Two Nested For Loops
console.log("\n--- Nested Loops Pattern ---");
for (let i = 1; i <= 6; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "* ";
    }
    console.log(row.trim());
}