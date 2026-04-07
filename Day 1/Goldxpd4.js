// ==========================================
//  Advanced Array Methods Analysis
// ==========================================

// Map
const doubled = [1, 2, 3].map(num => num * 2);
console.log(doubled); // [2, 4, 6]

// Reduce
const concatenated = [[0, 1], [2, 3]].reduce(
  (acc, cur) => acc.concat(cur),
  [1, 2]
);
console.log(concatenated); // [1, 2, 0, 1, 2, 3]

// Map with index
const arrayNum = [1, 2, 4];
const indexedDoubled = arrayNum.map((num, i) => `Index ${i} doubled is ${num * 2}`);
console.log(indexedDoubled);

// Nested arrays
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
console.log("Flat (depth 2):", array.flat(2)); // [1, 2, 3, [4], [5]]
console.log("Flat (Full):", array.flat(Infinity)); // [1, 2, 3, 4, 5]

const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
console.log(greeting.map(g => g.join(" ")).join(" "));
// "Hello young grasshopper! you are learning fast!"

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
console.log(trapped.flat(Infinity)); // [3]