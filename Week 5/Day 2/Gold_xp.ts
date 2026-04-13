// 1. Process Value: Formats numbers or reverses strings
const processValue = (value: string | number): string => 
  typeof value === "number" 
    ? `$${value.toFixed(2)}` 
    : [...value].reverse().join("");

// 2. Sum Numbers: Filters and totals numbers from a mixed array
const sumNumbersInArray = (items: (number | string)[]): number => 
  items.reduce<number>((total, item) => {
    const value = typeof item === "number" ? item : 0;
    return total + value;
  }, 0);

// 3. Advanced User: Handles optional address property
type AdvancedUser = { name: string; age: number; address?: string };

const introduceUser = (user: AdvancedUser): string => {
  const base = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  return user.address ? `${base} I live at ${user.address}.` : base;
};

// 4. Welcome User: Uses default parameter
const welcomeUser = (name: string, greeting: string = "Hello"): string => 
  `${greeting}, ${name}!`;

//
console.log(processValue(100), processValue("TypeScript"));
console.log(sumNumbersInArray([10, "apple", 20, 5.5]));
console.log(introduceUser({ name: "Alice", age: 28 }));
console.log(welcomeUser("Charlie"));
