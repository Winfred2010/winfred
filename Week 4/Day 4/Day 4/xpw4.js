//  Conditional Promise
const compareToTen = num => num <= 10 
  ? Promise.resolve(`${num} is less than or equal to 10`) 
  : Promise.reject(`${num} is greater than 10`);

compareToTen(15).then(console.log).catch(console.error);
compareToTen(8).then(console.log).catch(console.error);

//Delayed Resolve
new Promise(res => setTimeout(() => res("Exercise 2: success"), 4000))
  .then(console.log);

// Direct Resolve/Reject
Promise.resolve(3).then(res => console.log("Resolved:", res));
Promise.reject("Boo!").catch(err => console.log("Rejected:", err));
