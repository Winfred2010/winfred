/**
 * PART 1: BASICS
 */

const processValue = (value: string | number): string =>
  typeof value === "number" 
    ? `$${value.toFixed(2)}` 
    : value.split("").reverse().join("");

const sumNumbersInArray = (items: (number | string)[]): number =>
  items.reduce((acc: number, item) => (typeof item === "number" ? acc + item : acc), 0);

type AdvancedUser = { name: string; age: number; address?: string };

const introduceAdvancedUser = (user: AdvancedUser): string => {
  const msg = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  return user.address ? `${msg} I live at ${user.address}.` : msg;
};

const welcomeUser = (name: string, greeting: string = "Hello"): string => `${greeting}, ${name}!`;

/**
 *  ADVANCED
 */

type MappedType<T> = number;

const mapType = <T extends number | string>(value: T): MappedType<T> =>
  typeof value === "number" ? (value * value) : value.length;

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

interface HasNumericProperty { [key: string]: unknown }

const multiplyProperty = <T extends HasNumericProperty, K extends keyof T>(
  obj: T, key: K, factor: number
): number => {
  const value = obj[key];
  if (typeof value === "number") {
    return value * factor;
  }
  throw new Error("Not a number");
};

/**
 * TESTS
 */

console.log(processValue(50), processValue("TS"));
console.log(sumNumbersInArray([10, "test", 20]));
console.log(introduceAdvancedUser({ name: "Alex", age: 25 }));
console.log(mapType(4), mapType("Dev"));
console.log(getProperty({ brand: "Apple" }, "brand"));
console.log(multiplyProperty({ ram: 16 }, "ram", 2));
