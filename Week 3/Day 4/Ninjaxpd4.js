/**
 * 🔗 Recursive Currying Word Merger
 * Optimized to handle infinite arguments until an empty call () is made.
 */
const mergeWords = (string) => (nextString) => 
    nextString === undefined 
        ? string 
        : mergeWords(`${string} ${nextString}`);

// Test Case: Sentence Construction
const sentence = mergeWords('JavaScript')('is')('incredibly')('flexible')();
console.log(sentence); 

// Test Case: Single Word
const single = mergeWords('Refactored')();
console.log(single);