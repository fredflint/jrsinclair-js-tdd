'use strict';

const expect = require('chai').expect;
const Person = require('./person');
//import { person } from "./person.js";

//import { yolo } from "./yolo.js";
// yolo is a single instance of Yolo class

describe('Person', function () {
  it('class should exist', function () {
    expect(Person).to.exist; //not.be.undefined;
  });

  it('class instance can be created using "new"', function () {
     var person = new Person();
     expect(person).to.exist;//not.equal(null);//be.undefined;
  });
});
