/**
 * Promises, Fetch, and Async/Await
 */

// ---  compareToTen ---
const compareToTen = (num) => {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10. Success!`);
        } else {
            reject(`${num} is greater than 10. Error!`);
        }
    });
};

// --- 4-Second Promise ---
const waitFourSeconds = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Success (after 4 seconds)");
    }, 4000);
});

// --- Resolve & Reject  ---
const quickResolve = Promise.resolve(3);
const quickReject = Promise.reject("Boo!");

// ---  (Giphy)  (Star Wars Async) ---
const GIPHY_URL = "https://giphy.com";
const SWAPI_URL = "https://swapi.tech";

async function runApiCalls() {
    try {
        // Fetching Giphy (Ex 1 & 2)
        console.log("Fetching Giphy data...");
        const giphyRes = await fetch(GIPHY_URL);
        if (!giphyRes.ok) throw new Error("Giphy fetch failed");
        const giphyData = await giphyRes.json();
        console.log("Giphy Result:", giphyData);

        // Fetching Star Wars (Ex 3)
        console.log("Fetching Star Wars data...");
        const swapiRes = await fetch(SWAPI_URL);
        if (!swapiRes.ok) throw new Error("Star Wars fetch failed");
        const swapiData = await swapiRes.json();
        console.log("Star Wars Result:", swapiData.result);

    } catch (error) {
        console.error("API Error:", error);
    }
}

// --- Execution
function init() {
    console.log("--- Starting Exercises ---");

    // 
    compareToTen(8).then(console.log).catch(console.error);
    compareToTen(15).then(console.log).catch(console.error);

    // 
    waitFourSeconds.then(console.log);

    //
    runApiCalls();
}

init();
