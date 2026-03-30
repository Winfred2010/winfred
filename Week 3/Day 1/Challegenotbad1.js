// 1. Create the sentence
const sentence = "The movie is not that bad, I like it";

// 2. Find the position of "not"
const wordNot = sentence.indexOf("not");

// 3. Find the position of "bad"
const wordBad = sentence.indexOf("bad");

// 4. Logic: Replace "not...bad" if they exist and "bad" follows "not"
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    // Extract the part to replace: from 'not' to 'bad' (+3 for length of 'bad')
    const toReplace = sentence.substring(wordNot, wordBad + 3);
    const result = sentence.replace(toReplace, "good");
    console.log(result);
} else {
    // If conditions aren't met, log the original
    console.log(sentence);
}