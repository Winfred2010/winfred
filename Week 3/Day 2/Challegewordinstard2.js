/**
 * 🚀 Star Frame Challenge
 * 1. Prompts user for a comma-separated string.
 * 2. Finds the longest word to determine frame width.
 * 3. Prints the words inside a star border.
 */

function displayStarFrame() {
    // 1. Get input and transform into an array of trimmed words
    const userInput = prompt("Please enter several words separated by commas:");
    
    if (!userInput) {
        console.log("No words entered.");
        return;
    }

    const words = userInput.split(',').map(word => word.trim());

    // 2. Find the length of the longest word
    let maxLength = 0;
    for (const word of words) {
        if (word.length > maxLength) {
            maxLength = word.length;
        }
    }

    // 3. Define the frame width 
    // (Longest word + 2 spaces for padding + 2 stars for the border)
    const frameWidth = maxLength + 4;
    const border = "*".repeat(frameWidth);

    // 4. Construct and display the frame
    console.log(border); // Top border

    for (const word of words) {
        // Calculate trailing spaces needed to reach the maxLength
        const padding = " ".repeat(maxLength - word.length);
        console.log(`* ${word}${padding} *`);
    }

    console.log(border); // Bottom border
}

// Execute the function
displayStarFrame();