// --- Giphy API ---
const apiKey = "YOUR_API_KEY"; // Replace with your actual Giphy API key
const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`; // Giphy API URL

const fetchGif = async () => {
    try {
        const response = await fetch(giphyUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const { data } = await response.json();
        if (data && data.images && data.images.original && data.images.original.url) {
            const img = document.createElement("img");
            img.src = data.images.original.url;
            document.body.appendChild(img);
        } else {
            console.warn("Giphy API did not return expected image data.");
        }
    } catch (error) {
        console.error("Failed to fetch GIF:", error);
    }
};

fetchGif();

// --- Sequential vs Concurrent Analysis Logic ---
const resolveAfter2Seconds = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("slow"), 2000);
    });
};

const resolveAfter1Second = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("fast"), 1000);
    });
};

const sequentialStart = async () => {
    const slow = await resolveAfter2Seconds();
    const fast = await resolveAfter1Second();
    console.log(slow, fast);
};

const concurrentStart = async () => {
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
    console.log(await slow, await fast);
};

// Execute to see the difference
console.log("--- Sequential Start ---");
sequentialStart();
console.log("--- Concurrent Start ---");
concurrentStart();

// --- Refactored Fetch with Async/Await ---
const urls = [
    "https://jsonplaceholder.typicode.com/todos/1", // JSON API endpoint
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3"
];

const getData = async () => {
    try {
        const results = await Promise.all(urls.map(async (url) => {
            const response = await fetch(url);
            return response.ok ? await response.json() : Promise.reject(`Failed to fetch ${url} with status ${response.status}`);
        }));
        console.log(results);
    } catch (err) {
        console.error('Error fetching data with Promise.all:', err);
    }
};

getData();
