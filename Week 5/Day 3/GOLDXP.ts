class Employee {
  constructor(protected name: string, protected salary: number) {}
  getDetails = (): string => `${this.name}, $${this.salary}`;
}

class Manager extends Employee {
  constructor(name: string, salary: number, public department: string) {
    super(name, salary);
  }
  override getDetails = (): string => `${super.getDetails()} - Dept: ${this.department}`;
}

class Car {
  constructor(
    public readonly make: string,
    private readonly model: string,
    public year: number
  ) {}
  getCarDetails = (): string => `${this.year} ${this.make} ${this.model}`;
}

class MathUtils {
  static PI = 3.14159;
  static circumference = (radius: number): number => 2 * MathUtils.PI * radius;
}

interface Operation {
  execute(a: number, b: number): number;
}

class Addition implements Operation {
  execute = (a: number, b: number) => a + b;
}

class Multiplication implements Operation {
  execute = (a: number, b: number) => a * b;
}

interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class RectangleImpl implements Rectangle {
  constructor(
    public color: string,
    public readonly width: number,
    public readonly height: number
  ) {}
  getArea = () => this.width * this.height;
  getPerimeter = () => 2 * (this.width + this.height);
}
