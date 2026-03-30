// ==========================================
// 🚀 Array to String Conversions
// ==========================================
const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// 1. Using .toString()
console.log("toString():", numbers.toString());

// 2. Using .join() with different separators
console.log("join('+'):", numbers.join("+"));
console.log("join(' '):", numbers.join(" "));
console.log("join(''):", numbers.join(""));


// ==========================================
// Bubble Sort (Descending)
// ==========================================

/**
 * Bubble Sort Logic:
 * We compare two adjacent elements. If the left one is smaller than 
 * the right one, we swap them to move larger numbers to the front.
 */

for (let i = 0; i < numbers.length; i++) {
    // Inner loop handles the actual comparisons
    // We subtract 'i' because the smallest numbers "sink" to the end each pass
    for (let j = 0; j < numbers.length - 1 - i; j++) {
        
        // If current number is smaller than the next, swap them (Descending)
        if (numbers[j] < numbers[j + 1]) {
            
            // Temporary variable to hold the value during the swap
            let temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
            
            // Console log the swap to track progress
            console.log(`Swapped ${numbers[j+1]} with ${numbers[j]}. Current: [${numbers}]`);
        }
    }
}

console.log("\nFinal Sorted Array (Descending):", numbers);