

/***************** Let and const
 * 
 * 
 */

//ES5
var name5 = 'Jane Smith';
var age5 = 23;

name5 = 'Jane miller';

console.log(name5);

function driversLicence() {
    console.log("ES5 function");
}
driversLicence();

//ES6

const name6 = 'Jane Smith';
let age6 = 24;


driversES6 = () => {
    console.log("ES6 closure to function");

    if(true) {
        let firstName = 'John';
    }
    //Breaks, let is block scoped, not function scoped:)
    //console.log(firstName);

    let i = 100;
    for(let i = 0; i < 5; ++i) {
        console.log(i); //1,2...4
    }
    console.log(i);     //100
}
driversES6();

/************************Blocks and IIFEs 
 * 
*/

// Pretty much like braced scopes in cpp
{
    const a = 1;
    let b = 2;
    var c = 0;
    console.log(a, b);
}

//Breaks, cant access a or b
// console.log(a,b);
console.log(c);         //0


/*******************Strings
 * 
 */

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2019 - year;
}

//Template literals
//back ticks
console.log(`This is ${firstName} ${lastName}. He is ${calcAge(yearOfBirth)} years old`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('Smith'));
console.log(n.includes('-'));       //False
console.log(firstName.repeat(4));


/*************Arrow functions 
 * 
*/

// Pretty much lambdas using () => {}
// lambdas inherit the this keyword of the calling scope

const years = [1990, 1965, 1982];

years2 = years.map((element, index) => {
    return {element: element, index:index};
});
console.log(years2);


var box5 = {
    color: 'green',
    position : 1,
    clickMe : function() {
        document.querySelector('.green').onclick = function() {
            //Cant access position or color
            var str = 'This is box number' + this.position + 'with color ' + this.color;
            alert(str);
        }
    }
}
box5.clickMe();

var box6 = {
    color: 'blue',
    position : 1,
    clickMe : function() {
        document.querySelector('.blue').onclick = () => {
            //Can access color and position
            let str = 'This is box number' + this.position + 'with color ' + this.color;
            alert(str);
        }
    }
}
box6.clickMe();

// var box6 = {
//     color: 'blue',
//     position : 1,
        ////points to global this, not the object
//     clickMe : () => {
//         document.querySelector('.blue').onclick = () => {
//             //Can access color and position
//             let str = 'This is box number' + this.position + 'with color ' + this.color;
//             alert(str);
//         }
//     }
// }
// box6.clickMe();

function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
    // var arr = friends.map(function(el) {
    //     //this.name is not defined within this scope
    //     //The function(el) points to global object
    //     return this.name + ' is friends with ' + el;
    // });

    var arr = friends.map(function(el) {
        //this.name is not defined within this scope
        //The function(el) points to global object
        return this.name + ' is friends with ' + el;
    }.bind(this));
    // By binding, we copy the function and set this keyword to the person object  
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map((element) => {
        //this.name is not defined within this scope
        //The function(el) points to global object
        return `${this.name} is friends with ${element}`;
    });    
    console.log(arr);
}
new Person('JohnES6').myFriends6(friends);

/*************Destructuring */

//ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

//ES6
//Similar to python's variable unpacking
const [name, year] = ['John', 26];
console.log(name, year);

const obj = {
    fName: "John",
    lName: "Smith",
}
// The keys have to match the obj's keys
const {fName, lName} = obj;
console.log(lName);

//In this case we map key -> our variable
const {firstName: myName, lastName: myLastName} = obj;


/**************ARRAYS************** */

//ES5
const boxes = document.querySelectorAll('.box');
boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(element) {
    // Process element
})

//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(curr => { 
    //process
});

// Loop over array
for(const element of boxesArr6) {
    // Process element
}

//ES6
var ages = [12, 17, 8, 21, 14, 11, 100];

//Returns first index that matches callback
console.log(ages.findIndex((element, index, arr) => {
    return element >= 19;
}));
//Returns first element that matches callback
console.log(ages.find((element, index, arr) => {
    return element >= 19;
}));

/**************Spread operator */

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(19, 30, 11, 21);
console.log(sum1);

//ES5
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
//... expands the array
const sum3 = addFourAges(...ages);
console.log(sum3);


/***********************Rest parameters */

//ES5
// function isFullAge5() {
//     //arguments is a special member of the function
//     // console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);
//     argsArr.forEach(function(current) {
//         console.log(2019 - current >= 18);
//     });
// }

// isFullAge5(1990, 2010, 1965);

// //ES6
// //Transform arguments into an array
// function isFullAge6(...years) {
//     for(let year of years) {
//         console.log(2019 - year >= 18);
//     }
// }
// isFullAge6(1990, 2019, 1965);

function isFullAge5(limit) {
    //arguments is a special member of the function
    // console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(current) {
        console.log(2019 - current >= limit);
    });
}

//21 gets passed as limit
isFullAge5(21, 1990, 2000, 2010);

// This would probably work great with recursive head/tail functions
function isFullAge6(limit, ...years) {
    for(let year of years) {
        console.log(2019 - year >= limit);
    }
}

isFullAge6(21, 1990, 2000, 2010);

/*********************Default parameters */


function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    // Default constructor parameters in ES5
    this.firstName = firstName;
    this.lastName = lastName || 'Smith';
    this.yearOfBirth = yearOfBirth || 2000;
    this.nationality = nationality || 'US';
}

var john = new SmithPerson('John', 1990);
console.log(john);

//ES6
//Interesting thing about Js is that id doesn't require \
//Optional parameters to be at the end of the function
//Unlike Cpp, Python
function SmithPersonES6(firstName, yearOfBirth = 2000, lastName = 'Smith', nationality='US') {

    // Default constructor parameters in ES5
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
console.log(new SmithPersonES6('Joe'));


/*************MAPS 
 * ES6 introduces maps that uses hashmaps using objects as keys
*/

function add(a, b) {
    console.log('Add function called', a + b);
}
const question = new Map();
question.set('question', 'What is the official name of the latest major Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
//Maps function to str
question.set(add, add(5, 3));

question.get(add);

/************Classes
 * Syntactic sugar for inheritance 
 */


//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('john', 1990, 'Programmer');
john5.calculateAge();

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    //Member function
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    //Static functions // Not hoisted
    static greeting() {
        console.log('Hey there');
    }
}

var john6 = new Person6('john', 1990, 'Programmer');
john6.calculateAge();

Person6.greeting();

/****************Inheritance */

var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

// Athlete does not inherit prototype functions
// console.log(new Athlete5('John', 1990, 'Swimmer', 2, 2).calculateAge());

console.log(new Athlete5('John', 1990, 'Swimmer', 2, 2));

//After this, Athlete inherits Person5 prototype functions
Athlete5.prototype = Object.create(Person5.prototype);
new Athlete5('John', 1990, 'Swimmer', 2, 2).calculateAge();

//This has to be after Athlete5 prototype definition
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

//ES6

class Person6_2 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    //Member function
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6_2 {
    constructor (name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    };

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

var john6 = new Athlete6('john', 1990, 'programmer', 2, 2);
console.log(john6);

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, 
and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. 
All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. 
If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, 
template strings, default parameters, maps, arrow functions, 
destructuring, etc.

*/

class Structure {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Structure {
    constructor(name, buildYear, treeNumber, area) {
        super(name, buildYear);
        this.treeNumber = treeNumber;
        this.area = area;
    }

    getTreeDensity() {
        return this.treeNumber / this.area;
    }
}

class Street extends Structure {
    constructor(name, buildYear, length, size='normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}

class City {
    constructor(parks = [], streets = []) {
        this.parks = parks;
        this.streets = streets;
    }

    getAverageTreeDensityParks() {
        let sumTreeDensity = 0
        for(let park of this.parks) {
            sumTreeDensity += park.getTreeDensity();
        }
        return sumTreeDensity / this.parks.length;
    }

    getParkAverageAge() {
        let date = new Date();
        let year = date.getFullYear();
        let sumParkYears = 0;
        for(let park of this.parks) {
            sumParkYears += year - park.buildYear;
        }
        return sumParkYears / this.parks.length;
    }

    getParksWithThousandTrees() {
        let parkNames = [];
        for(let park of this.parks) {
            if(park.treeNumber >= 1000) {
                parkNames.push(park.name);
            }
        }
        return parkNames;
    }

    getStreetInfo() {
        let sumStreetLength = 0;
        for(let street of this.streets) {
            sumStreetLength += street.length;
        }

        return [sumStreetLength / this.streets.length, sumStreetLength];
    }

    printStreetSizes() {
        for(let street of this.streets) {
            console.log(`Street: ${street.name} -  Size: ${street.size}`);
        }
    }
}

let myCity = new City(
    [new Park('Park1', 1990, 1000, 20), new Park('Park2', 2000, 40, 100), ],
    [new Street('Street1', 1980, 10), new Street('Street2', 1995, 4, 'small')]
);

console.log(myCity.getAverageTreeDensityParks());
console.log(myCity.getParkAverageAge());
console.log(myCity.getParksWithThousandTrees());
console.log(myCity.getStreetInfo());
myCity.printStreetSizes();


console.log('\n\n\n\n');
