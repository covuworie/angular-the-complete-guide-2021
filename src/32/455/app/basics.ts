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
