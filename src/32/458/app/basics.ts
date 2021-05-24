// Primitives: number, string, boolean
// More complex types: array, objects
// Function types, parameters

// Primitives
let age: number;

age = 12;

let userName: string;

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ["Sports", "Cooking"];

type Person = { name: string; age: number }; // Type alias

let person: Person;

person = {
  name: "Max",
  age: 32,
};

let people: Person[];

people = [
  {
    name: "Max",
    age: 32,
  },
  {
    name: "Pete",
    age: 32,
  },
];

// Type inference and union types

let course: string | number = "React - The Complete Guide";

course = 12341;

// Functions & types

function add(a: number, b: number) {
  return a + b;
}

function logToConsole(value: any) {
  console.log(value);
}

// Generics (type safe yet flexible as they work with any type)

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, 0); // [0, 1, 2, 3]
const stringArray = insertAtBeginning(["b", "c", "d"], "a");

// updatedArray[0].split('');

// Classes

class Student {
  // firstName: string;
  // lastName: string;
  // age: number;
  // private courses: string[];

  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    private courses: string[]
  ) {}

  enroll(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student = new Student("Max", "Schwartz", 32, ["Angular"]);
student.enroll("React");
student.listCourses();

// student.courses => Angular, React
