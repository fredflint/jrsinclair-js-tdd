// File: person.js

class Person {
   constructor(firstName, lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }

   display() {
       console.log(this.firstName + " " + this.lastName);
   }
}

module.exports = Person;
//export let person = new Person();
