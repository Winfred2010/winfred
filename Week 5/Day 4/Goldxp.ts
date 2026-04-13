// Intersection Types & Type Guards
interface User { name: string; email: string; }
interface Admin { adminLevel: number; }
type AdminUser = User & Admin;

const getProperty = (obj: AdminUser, key: string): any => 
  key in obj ? (obj as any)[key] : undefined;

//  Type Casting with Generics
const castToType = <T>(value: any, constructor: { new (...args: any[]): T }): T => 
  new constructor(value);

//  Generic Constraints & Length
const getArrayLength = <T extends string | number>(arr: T[]): number => arr.length;

// Generic Interfaces & Classes
interface Storage<T> {
  add(item: T): void;
  get(index: number): T;
}

class Box<T> implements Storage<T> {
  private items: T[] = [];
  add = (item: T): void => { this.items.push(item); };
  get = (index: number): T => this.items[index];
}

//Generic Classes with Constraints
interface Item<T> { value: T; }

class Queue<T> {
  private collection: Item<T>[] = [];
  add = (item: Item<T>): void => { this.collection.push(item); };
  remove = (): Item<T> | undefined => this.collection.shift();
}

/** 
 * 
 */
const admin: AdminUser = { name: "Ben", email: "ben@ms.com", adminLevel: 1 };
console.log(getProperty(admin, "adminLevel"));

const num = castToType("123", Number);
const bool = castToType("true", Boolean);

console.log(getArrayLength([1, 2, 3]), getArrayLength(["a", "b"]));

const stringBox = new Box<string>();
stringBox.add("TS");

const numQueue = new Queue<number>();
numQueue.add({ value: 10 });
