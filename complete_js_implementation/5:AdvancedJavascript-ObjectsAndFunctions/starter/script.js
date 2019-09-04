// Function constructor
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    // this.calculateAge = function() {
    //     console.log(2019 - this.yearOfBirth);
    // }
};

// Add function to prototype
Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

// Instantiation
var john = new Person('John', 1990, 'teacher');

// new first creates an empty object, then the Person function is called
// the function constructor sets the empty object's properties.
// if the constructor object does not return anything, 
// then the empty object (now constructed) is returned

john.calculateAge();

var jane = new Person('Jane', 1969, 'designer');
jane.calculateAge();

console.log(john, jane);        //Last name and calculateAge are inside __proto__

console.log(john.hasOwnProperty('name'));       //True, it belongs to the instance
console.log(john.hasOwnProperty('lastName'));   //False, it belongs to the constructor's prototype


console.log(john instanceof Person)             //True

/**************************Proper inheritance example

About Object.prototype.call...
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/call

Another way of using inheritance

// Vehicle - superclass
function Vehicle(name) {
    this.name = name;
}

// superclass method
Vehicle.prototype.start = function() {
    return "engine of "+this.name + " starting...";
};

// Car - subclass
function Car(name) {
    Vehicle.call(this,name); // call super constructor.
}

// subclass extends superclass
Car.prototype = Object.create(Vehicle.prototype);
// subclass method
Car.prototype.run = function() {
    console.log("Hello "+ this.start());
};

// instances of subclass
var c1 = new Car("Fiesta");
var c2 = new Car("Baleno");

// accessing the subclass method which internally access superclass method
c1.run();   // "Hello engine of Fiesta starting..."
c2.run();   // "Hello engine of Baleno starting..."

*/


// base object with methods including initialization
var Vehicle = {
    init: function(name) {
        this.name = name;
    },
    start: function() {
        return "engine of "+this.name + " starting...";
    }
}

// delegation link created between sub object and base object
var Car = Object.create(Vehicle);

// sub object method
Car.run = function() {
    console.log("Hello "+ this.start());
};
// instance object with delegation link point to sub object
var c1 = Object.create(Car);
c1.init('Fiesta');

var c2 = Object.create(Car);
c2.init('Baleno');

c1.run();   // "Hello engine of Fiesta starting..."
c2.run();   // "Hello engine of Baleno starting..."

/*********************Creating objects
 * Object.create
 */

var personProto = {
    calculateAge: function() {
        console.log(2019 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
console.log(john);

var jane = Object.create(personProto, {
    name : {value: 'Jane'},
    yearOfBirth : {value: 1969}
});
console.log(jane);

/*********************
 * primitives vs objects
 * 
 * variables contain primitives hold that data inside itself
 * variables in objects hold a reference to the value that they represent
 * 
 * Basically primitives are passed by copy but objects are passed by reference
 */

var a = 23;
var b = a;
a = 46;

console.log(a,b);       //Only a is modified

var obj1 = {
    name: 'John',
    age : 26
};

var obj2 = obj1;
obj2.name = "John2";        //Both get modified

var obj3 = {
    name: obj1.name,        //This gets copied
    age : 26
};

obj3.name = "Not John2";

console.log(obj1, obj2, obj3);

// Testing
//Basically primitives are passed by copy but objects are passed by reference

complex1 = {
    a : 1,
    b : 2
};

container = {
    c1 : complex1,
    c2 : complex1,
    c3 : complex1,
};

container.c2 = {
    a : 10,
    b : 20
}
container.c3.a = 100000;    // Modifies both c1 and c3's a

console.log(container);


/*************************************
 * Functions are also objects
 * First class functions
 */

years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrResult = [];
    for(var i in arr) {
        arrResult.push(fn(arr[i]))
    }
    return arrResult;
}
console.log(arrayCalc(years, function(element) {
    return element*2;
}));

console.log(arrayCalc(years, function(element) {
    return !(element & 1);
    // return element % 2 == 0;
}));

/**************************************
 * functions that return functions
 */

function interviewQuestion(job) {

    if(job === 'designer') {
        return function(name) {
            console.log(name + ' can you plain explain what UX design is?');
        }
    } else if(job === 'teacher') {
        return function(name) {
            console.log(name + ' what subject do you teach?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ' what do you do?');
        }
    }
}

var question = interviewQuestion('teacher');
question('Juan');
question('Kevin');

interviewQuestion('designer')('Raul');

/***********************************
 * Immediately invoked function expression IIFE
 */

// function game() {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// This is an IIFE
// By wrapping the anonymous function around a parenthesis
// The compiler treats it as an expression instead of a definition
// This way we can immediately call it

// This helps hiding the variables defined inside the function
// Avoiding global scope
(function () {
    var score = Math.random() * 10;
    console.log(score);
})();

/*******************************
 * Closures
 */

function retirement(retirementAge) {
    var a = ' years left until retirement';
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

// This is a closure
// Inner function has access to a var even after it has returned
// Execution stack has popped retirement but the anonymous function
// Can still access it because of the scope chain
// Cool explanation at minute 8
// https://www.udemy.com/the-complete-javascript-course/learn/lecture/5869200#overview

var retirementUS = retirement(65);
retirementUS(2000);

// retirement(65)(2000);

function closureInterviewQuestion(job) {

    return function(name) {
        if(job === 'designer') {
            console.log(name + ' can you plain explain what UX design is?');
        } else if(job === 'teacher') {
            console.log(name + ' what subject do you teach?');
        } else {
            console.log('Hello ' + name + ' what do you do?');
        }
    }
}

closureInterviewQuestion('other')('Juan');

/******************************************
 * Bind, call and apply
 * Call calls the function but sets the first argument as this
 * Apply receives first argument (this) and array of args
 * Bind creates a copy of the function with the this argument set
 * It lets us copy the function with preset arguments
 * similar to cpp's bind
 */

 console.log("-----------Bind, call, apply");

var john = {
    name : 'John',
    age : 26,
    job : 'teacher',
    presentation : function(style, timeOfDay) {

        if(style === 'formal') {
            console.log('Good ' + timeOfDay 
            + ', Ladies and gentlemen ' 
            + 'I\'m ' + this.name 
            + ', I\'m a ' + this.job 
            + ', and I\'m ' + this.age + ' years old');
        } else if (style === 'friendly') {
            console.log('Hey, what\'s up '
            + 'I\'m ' + this.name 
            + ', I\'m a ' + this.job 
            + ', and I\'m ' + this.age + ' years old. '
            + 'Have a nice ' + timeOfDay);
        }
    }
};

john.presentation('formal', 'morning')
john.presentation('friendly', 'morning')

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
}

// If you don't provide all the arguments
// it does nothing.
console.log("HEY");
// john.presentation.call(emily, 'afternoon'); 
john.presentation.call(emily, 'friendly', 'afternoon');

// Will not work because presentation does not receive an array
// Apply is basically call but with an array argument
// john.presentation.apply(emily, ['friendly', 'afternoon']);

//Bind is great for creating wrappers as in cpp
//This is similar to currying

/*
Currying
Currying is the process of taking a function with multiple 
arguments and returning a series of functions that 
take one argument and eventually resolve to a value.

function volume(l, w, h) {
  return l * w * h;
}

const curried = _.curry(volume);

volume(2, 3, 4); // 24
curried(2)(3)(4); // 24

*/
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('night')

console.log('\n\n\n\n\n');