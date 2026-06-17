// Exercise 1: Generics and Intersection Types
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  list(): T[] {
    return this.items;
  }
}

// Example usage with Intersection
type Item = { id: number } & { name: string };
const container = new Container<Item>();

// Exercise 2: Generic Interfaces and Type Casting
interface ApiResponse<T> {
  status: number;
  data: T;
}

function parseResponse<T>(response: any): ApiResponse<T> {
  return response as ApiResponse<T>;
}

// Exercise 3: Generic Classes and Type Assertions
class Repository<T> {
  private storage: T[] = [];

  add(item: T): void {
    this.storage.push(item);
  }

  get(index: number): T {
    return this.storage[index] as T;
  }

  list(): T[] {
    return this.storage;
  }
}