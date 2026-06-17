// Advanced Modifiers & Inheritance
class Employee {
  constructor(public name: string, private age: number, protected salary: number) {}
  protected calculateBonus = (): number => this.salary * 0.1;
}

class Manager extends Employee {
  getSalaryDetails = (): string => `Total: ${this.salary + this.calculateBonus()}`;
}

class ExecutiveManager extends Manager {
  approveBudget = (): string => "Budget Approved";
}

// Static Members & Tracking
class Shape {
  static totalShapes = 0;
  constructor() { Shape.totalShapes++; }
  static getType = (): string => "Generic Shape";
}

class Circle extends Shape {
  static override getType = (): string => "Circle";
}

class Square extends Shape {
  static override getType = (): string => "Square";
}

//  Interfaces with Function Types
interface Calculator {
  a: number;
  b: number;
  operate(fn: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  constructor(public a: number, public b: number) {}
  operate = (fn: (x: number, y: number) => number): number => fn(this.a, this.b);
}

//  Readonly in Inheritance
class Device {
  constructor(public readonly serialNumber: string) {}
}

class Laptop extends Device {
  constructor(sn: string, public model: string, public price: number) { super(sn); }
  getDetails = (): string => `${this.model} (${this.serialNumber}) - $${this.price}`;
}

// Multi-Interface Implementation
interface Product {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends Product {
  warrantyPeriod: number;
}

class Smartphone implements Electronics {
  constructor(
    public readonly name: string,
    public price: number,
    public warrantyPeriod: number,
    public discount: number = 0
  ) {}
  getFinalPrice = (): number => this.price - (this.price * this.discount);
}
