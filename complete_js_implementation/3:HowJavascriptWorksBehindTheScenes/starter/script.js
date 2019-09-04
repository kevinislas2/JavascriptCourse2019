///////////////////////////////////////
// Lecture: Hoisting

// Still works (Hoisting)
calculateAge(1990);         // Whis works for function declarations
                            // But not for function expressions

function calculateAge(year) {
    console.log(2019 - year);
}

// retirement(1990);                //Breaks
var retirement = function(year) {
    console.log(65 - (2019 - year));
}

retirement(1990);

console.log(age);                   //This doesn't break because at this point
                                    // age is undefined
var age = 23;
s = () => {
    var age = 65;
    console.log(age);               //65 age in this scope shadows global age
}
s()
console.log(age);                   //23 global age

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

console.log("------------------------Scope-------")
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    // Curious and dangerous, if b is not declared as var
    // b = 'Hi'
    // b goes to global scope!!
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

//Breaks, third doesnt have access to b and c
function third() {
    var d = 'John';
    console.log( a + b + c + d);
}
// third()

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

console.log(this);

function calculateAge() {
    console.log(this);      //window
}
calculateAge();

obj = {
    objMethod : function() {
        console.log(this);      //logs obj

        function innerFunction() {
            console.log("InnerFunction", this);     //logs window
        }
        innerFunction();
    },
    secondFunction : function() {
        console.log(this);
    }
};

obj.objMethod();

mike = {
    name : "Mike"
}

// Although mike borrows secondFunction, this inside mike's secondFunction
// is equal to mike
mike.secondFunction = obj.secondFunction;
mike.secondFunction();

