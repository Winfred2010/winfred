//  Access Modifiers
class Employee {
  constructor(
    private name: string,
    private salary: number,
    public position: string,
    protected department: string
  ) {}

  public getEmployeeInfo = (): string => `${this.name}, ${this.position}`;
}

// Readonly Properties
class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number
  ) {}

  getProductInfo = (): string => `${this.name}: $${this.price}`;
}

//Inheritance
class Animal {
  constructor(public name: string) {}
  makeSound = (): string => "Some generic sound";
}

class Dog extends Animal {
  override makeSound = (): string => "bark";
}

// Static Methods
class Calculator {
  static add = (a: number, b: number): number => a + b;
  static subtract = (a: number, b: number): number => a - b;
}

// Extending Interfaces
interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

const printUserDetails = (user: PremiumUser): void => {
  console.log(`${user.name} (${user.email})${user.membershipLevel ? ` - Level: ${user.membershipLevel}` : ""}`);
};
