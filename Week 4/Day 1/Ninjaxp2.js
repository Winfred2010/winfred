// --- Exercise 1: Menu Operations ---
const menu = [
  { type: "starter", name: "Houmous with Pita" },
  { type: "starter", name: "Vegetable Soup with Houmous peas" },
  { type: "dessert", name: "Chocolate Cake" }
];

// Check for dessert using some() and ternary
const hasDessert = menu.some(item => item.type === "dessert") ? "Yes, dessert exists" : "No dessert";
console.log(hasDessert);

// Check if all are starters using every()
const allStarters = menu.every(item => item.type === "starter");
console.log("All starters?", allStarters);

//Check for main course, add if missing
if (!menu.some(item => item.type === "main")) {
  menu.push({ type: "main", name: "Grilled Salmon" });
}
console.log("Updated Menu:", menu);

// Add vegetarian boolean based on name content
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
menu.forEach(item => {
  item.vegetarian = vegetarian.some(vegWord => 
    item.name.toLowerCase().includes(vegWord)
  );
});
console.log("Menu with Vegetarian keys:", menu);


// --- Chop into chunks ---
function string_chop(str, size) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}
console.log(string_chop('developers', 2));


// ---  You said string? ---
function search_word(text, word) {
  const count = text.split(' ').filter(w => w === word).length;
  return `'${word}' was found ${count} times.`;
}
console.log(search_word('The quick brown fox', 'fox'));


// --- Reverse Array (In-place) ---
function reverseArray(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    // Swap elements using destructuring
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
  return arr;
}
console.log(reverseArray([1, 2, 3, 4, 5]));
