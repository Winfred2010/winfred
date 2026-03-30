/**
 * 🔠 Letters Only Input
 */
const letterInput = document.getElementById("letter-input");

letterInput.addEventListener("input", (event) => {
    // The value of the input
    const value = event.target.value;

    // Regular Expression: [^a-zA-Z] means "anything that is NOT a letter"
    // 'g' means global (check the whole string)
    const cleanValue = value.replace(/[^a-zA-Z]/g, "");

    // Update the input to show only the letters
    event.target.value = cleanValue;
});