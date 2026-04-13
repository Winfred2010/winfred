type Person = { name: string; age: number };
type Address = { street: string; city: string };
type Job = { position: string; department: string };

type PersonWithAddress = Person & Address;
type Employee = Person & Job;

const describeEmployee = (emp: Employee): string => 
  emp.position === "Manager" 
    ? `${emp.name} manages the ${emp.department} department.`
    : `${emp.name} is a ${emp.position} in ${emp.department}.`;

const describeValue = (value: number | string): string => 
  typeof value === "number" ? "This is a number" : "This is a string";

const getFirstElement = (arr: (number | string)[]): string => arr[0] as string;

interface HasLength { length: number; }

const logLength = <T extends HasLength>(item: T): void => console.log(item.length);

const formatInput = <T extends { toString(): string }>(input: T): string => 
  `Formatted: ${input.toString()}`;
