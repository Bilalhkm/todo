/* 

const Bilal = new Person("Bilal", "Hekim", 27);
class Engineer extends Person {}
const Muhammed = new Engineer("muhammed", "şelleh", 35);

console.log(Bilal);
console.log(Bilal.fullName());
console.log(Muhammed);
console.log(Person);
console.log(Engineer);
console.log(Muhammed instanceof Person);

 */

class Person {
  constructor(name, surName, age) {
    this.name = name;
    this.surName = surName;
    this.age = age;
  }
  fullName() {
    return `${this.name} ${this.surName}`;
  }
}
class Engineer extends Person {
  constructor(name, surName, age, job) {
    super(name, surName, age);
    this.job = job;
  }
  getMony() {
    console.log("get money");
  }
}
const Muhammed = new Engineer("muhammed", "şelleh", 35);

Muhammed.job = "electrical engineer";
console.log(Muhammed);
console.log(Muhammed.fullName());
console.log(Muhammed.getMony());

class GoodPerson extends Person {}
