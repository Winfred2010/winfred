/**
 * 🏔️ Landscape Generator (Nested Arrow Functions)
 */
const landscape = () => {
    let result = "";

    const flat = (x) => {
        for (let count = 0; count < x; count++) {
            result += "_";
        }
    };

    const mountain = (x) => {
        result += "/";
        for (let counter = 0; counter < x; counter++) {
            result += "'";
        }
        result += "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

console.log("Landscape:", landscape());


/**
 * 🔒 Closure Example
 */
const addTo = x => y => x + y;
const addToTen = addTo(10);

console.log("Closure Result:", addToTen(3)); // 13


/**
 * 🍛 Currying Examples
 */
const curriedSum = (a) => (b) => a + b;

console.log("Curried Sum (30 + 1):", curriedSum(30)(1)); // 31

const add5 = curriedSum(5);
console.log("Curried Add5 (5 + 12):", add5(12)); // 17


/**
 * ⛓️ Functional Composition
 */
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5ToNum = (num) => num + 5;

// Calculation: add1(add5ToNum(10)) -> add1(15) -> 16
const compositionResult = compose(add1, add5ToNum)(10);

console.log("Composition Result:", compositionResult);