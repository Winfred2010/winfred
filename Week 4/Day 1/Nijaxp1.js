// Dog Ages (Loop & Reduce)
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' },
];

// Loop method
let dogAgeSumLoop = 0;
for (let pet of data) {
  if (pet.type === 'dog') dogAgeSumLoop += pet.age * 7;
}
console.log('Exercise 1 (Loop):', dogAgeSumLoop);

// Reduce method
const dogAgeSumReduce = data
  .filter(pet => pet.type === 'dog')
  .reduce((acc, dog) => acc + (dog.age * 7), 0);
console.log('Exercise 1 (Reduce):', dogAgeSumReduce);


// Email (Single Line Cleanup)
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanEmail = userEmail3.trim();
console.log('Exercise 2:', cleanEmail);


// Employees #3 (Array to Object Mapping)
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

const usersObject = {};
users.forEach(user => {
  usersObject[`${user.firstName} ${user.lastName}`] = user.role;
});
console.log('Exercise 3:', usersObject);


//  Array to Object (Counting Occurrences)
const letters = ['x', 'y', 'z', 'z'];

// Loop method
const letterCountLoop = {};
for (let char of letters) {
  letterCountLoop[char] = (letterCountLoop[char] || 0) + 1;
}
console.log('Exercise 4 (Loop):', letterCountLoop);

// Reduce method
const letterCountReduce = letters.reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
console.log('Exercise 4 (Reduce):', letterCountReduce);
