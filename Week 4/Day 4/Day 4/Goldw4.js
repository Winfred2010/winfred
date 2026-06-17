// Define the promises
const promise1 = Promise.resolve(3);
const promise2 = 42; 
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

const promiseArr = [promise1, promise2, promise3];

/**
 * EXPLANATION:
 * Promise.all takes an array of promises and returns a single promise that resolves 
 * only when ALL items in the array have resolved. 
 * * WHY THIS OUTPUT:
 * We get [3, 42, "foo"] because Promise.all maintains the order of the original array, 
 * even though promise3 takes 3 seconds to finish. It "waits" for the slowest promise 
 * before returning the final collection.
 */

// Traditional .then() syntax
Promise.all(promiseArr)
  .then((results) => {
    console.log("Output from .then():", results);
  })
  .catch((error) => {
    console.error("A promise failed:", error);
  });

// Modern async/await syntax (Cleaner for real-world projects)
const runAsyncTasks = async () => {
  try {
    const results = await Promise.all(promiseArr);
    console.log("Output from async/await:", results);
  } catch (err) {
    console.error("Caught an error in async function:", err);
  }
};

runAsyncTasks();