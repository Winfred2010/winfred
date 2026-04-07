// Data: Array of Objects
let quotes = [
    { id: 0, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 },
    { id: 1, author: "Albert Einstein", quote: "Two things are infinite: the universe and human stupidity.", likes: 0 },
    { id: 2, author: "Frank Zappa", quote: "So many books, so little time.", likes: 0 }
];

let currentQuoteIndex = null;
let filteredQuotes = [];
let filterCurrentIndex = 0;

// Selectors
const displaySection = document.getElementById('quote-display');
const textDisplay = document.getElementById('quote-text');
const authorDisplay = document.getElementById('quote-author');
const likeCountDisplay = document.getElementById('like-count');

// --- PART 1: Generate Quote ---
document.getElementById('generate-btn').addEventListener('click', () => {
    let randomIndex;
    // Prevent displaying the same quote twice in a row
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentQuoteIndex && quotes.length > 1);

    currentQuoteIndex = randomIndex;
    renderQuote(quotes[currentQuoteIndex]);
});

function renderQuote(quoteObj) {
    textDisplay.textContent = `"${quoteObj.quote}"`;
    authorDisplay.textContent = `- ${quoteObj.author}`;
    likeCountDisplay.textContent = quoteObj.likes;
}

// --- PART 2: Add Quote & Stats ---
document.getElementById('btn-add').addEventListener('click', () => {
    const qInput = document.getElementById('input-quote');
    const aInput = document.getElementById('input-author');

    if (qInput.value && aInput.value) {
        const newEntry = {
            id: quotes.length,
            author: aInput.value,
            quote: qInput.value,
            likes: 0
        };
        quotes.push(newEntry);
        qInput.value = ''; aInput.value = '';
        alert("Quote added!");
    }
});

// Character/Word Counts
document.getElementById('btn-chars-space').onclick = () => {
    if (currentQuoteIndex === null) return alert("Generate a quote first!");
    alert(`Characters (with space): ${quotes[currentQuoteIndex].quote.length}`);
};

document.getElementById('btn-chars-no-space').onclick = () => {
    if (currentQuoteIndex === null) return alert("Generate a quote first!");
    alert(`Characters (no space): ${quotes[currentQuoteIndex].quote.replace(/\s/g, '').length}`);
};

document.getElementById('btn-words').onclick = () => {
    if (currentQuoteIndex === null) return alert("Generate a quote first!");
    const words = quotes[currentQuoteIndex].quote.trim().split(/\s+/).length;
    alert(`Words: ${words}`);
};

// Likes
document.getElementById('btn-like').onclick = () => {
    if (currentQuoteIndex !== null) {
        quotes[currentQuoteIndex].likes++;
        likeCountDisplay.textContent = quotes[currentQuoteIndex].likes;
    }
};

// --- PART 3: Filter Logic ---
document.getElementById('btn-filter').addEventListener('click', () => {
    const authorName = document.getElementById('filter-author').value.toLowerCase();
    filteredQuotes = quotes.filter(q => q.author.toLowerCase().includes(authorName));

    if (filteredQuotes.length > 0) {
        filterCurrentIndex = 0;
        currentQuoteIndex = filteredQuotes[filterCurrentIndex].id;
        document.getElementById('filter-nav').style.display = 'block';
        renderQuote(filteredQuotes[filterCurrentIndex]);
    } else {
        alert("No quotes found for that author.");
        document.getElementById('filter-nav').style.display = 'none';
    }
});

document.getElementById('btn-prev').onclick = () => {
    if (filterCurrentIndex > 0) {
        filterCurrentIndex--;
        currentQuoteIndex = filteredQuotes[filterCurrentIndex].id;
        renderQuote(filteredQuotes[filterCurrentIndex]);
    }
};

document.getElementById('btn-next').onclick = () => {
    if (filterCurrentIndex < filteredQuotes.length - 1) {
        filterCurrentIndex++;
        currentQuoteIndex = filteredQuotes[filterCurrentIndex].id;
        renderQuote(filteredQuotes[filterCurrentIndex]);
    }
};