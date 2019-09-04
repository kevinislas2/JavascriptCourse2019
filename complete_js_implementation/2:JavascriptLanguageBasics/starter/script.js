console.log('Hello world from script.js');

let intro = false;
let mutation = false;
let operators = false;
let precedence = false;
let codeChallenge1 = false;
let statementsAndOperators = false;
let codeChallenge2 = false;
let functionStatements = false;
let arrays = false;
let codeChallenge3 = false;
let objectStuff = false;
let codeChallenge4 = false;
let loops = false;
let codeChallenge5 = true;
if(intro) {
    // Variables

    var firstName = 'John';

    console.log(firstName);

    let age = 5;

    console.log(age);

    // let has limited scope definition
    console.log(window.firstName);      //John
    console.log(window.age);            //undefined

    const x = 5;

    //x = 6;        //Breaks, cant modify a const

    console.log(x);

    var job;
    console.log(job);       // Undefined
}

if(mutation) {
/***********************************
 * Variable mutation and type coercion
 */
    var firstName = 'John';
    var age = 28;

    console.log(firstName + ' ' + age);     //Age conversion to string

    var job, isMarried;
    job = 'teacher';
    isMarried = false;

    console.log(firstName + ' is a ' + age + ' year old ' + job 
        + ' is he married? ' + isMarried);

    //Variable mutation
    age = 'twenty eight';               //mutates to string (bad practice)

    alert(firstName + ' is a ' + age + ' year old ' + job 
        + ' is he married? ' + isMarried);

    var lastName = prompt('What is his last Name');
    console.log(lastName);
}

if(operators) {
/***************************
 * Operators
 */
    //Math
    var year = 2018 - 28 + 5 * 2;
    console.log(year);

    // Logical operators

    console.log(5 > 2);

    // Boolean operators
    console.log(5 & 2);
    console.log(1 | 12);        //Adds 1 if even, 0 if odd

    //typeof keyword
    var x;
    console.log(typeof year);
    console.log(typeof x);          //undefined
}

if(precedence) {
/***************************
 * Operator precedence
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */

    // As always, each expression is independently executed

    var boolVar = 18 - 2019 > 200;
    console.log(boolVar);

    var x, y;
    y = x = (3 + 5); // assignment works right to left
    console.log(x, y);      //8, 8
}

if(codeChallenge1) {
/***************************
 * Coding challenge 1
 */

/*
Mark and John are trying to compare their BMI (Body mass Index),
which is calculated using the formula:
BMI = mass / height^2 = mass / (height * height).
Mass in kg and height in meters.

1.- Store Mark's and John's mass and height in variables.
2.- Calculate both their BMI's
3.- Create a boolean containing whether Mark has a higher BMI than John.
4.- Print a string to the console containing the variable from 3.
*/
    var john = {
        name : 'John',
        height: 0,
        mass: 0,
        bmi: 0,
    };

    var mark = {
        name : 'Mark',
        height: 0,
        mass: 0,
        bmi: 0,
    };

    // Arrays and objects are passed by reference
    function queryHeightAndMass(person) {
        // Parse float is a relatively unsafe function call
        person.height = parseFloat(prompt('Enter ' + person.name + '\'s height'));
        person.mass = parseFloat(prompt('Enter ' + person.name + '\'s mass'));
    }

    function calculateBMI(person){
        person.bmi = person.mass / (person.height * person.height);
    }

    queryHeightAndMass(john);
    queryHeightAndMass(mark);

    calculateBMI(john);
    calculateBMI(mark);

    // Parenthesis are needed or the + is solved before the comparison
    // Yielding (string + float) > float (false)
    console.log("Is Mark's BMI higher than John's? " + (mark.bmi > john.bmi));

    console.log(mark);
    console.log(john);

}

if(statementsAndOperators) {
/***************************
 * If else statements
 * Boolean logic
 * ternary operator
 * truthy and falsy values and equality operators
 */
    var boolVar = true;
    if(boolVar) {
        console.log("Boolvar is true");
    }

    x = 0;
    y = "0";
    console.log(x === y); //Does not apply type conversion (checks type and value)
    console.log(x == y);  //Applies type conversion

    // ^ is xor (evaluates to 0)
    // !! is to convert 0 to false
    console.log( !!(true ^ true) );

    // Ternary operator
    console.log(5 > 2 ? "Five greater than two" : "Two greater than five")

    // x = 1;
    x = 'dog';

    // in js, we can have multiple type cases inside a switch
    switch(x) {
        case 0:
            console.log("ZERO");
            break;
        case 1:
            console.log("ONE");
            break
        case "dog":
            console.log("WHY DOG");
            break;
        default:
            console.log("Neither 1 nor 0");
            break
    }

    var age = 30;
    switch(true) {
        case age <= 10:
            console.log("Age <= 10");
            break;
        case age <= 20 && age >= 10:    //Not needed due to switch order, but can be used
            console.log("Age <= 20");
            break;
        case age <= 30:
            console.log("Age <= 30");
            break; 
    }

    //Falsy values
    undefined;
    null;
    0;
    "";
    NaN;

    //Truthy values = !falsy

}

if(codeChallenge2) {
/********************************
 * Code challenge 2
 */
    johnScores = [89, 120, 103];
    mikeScores = [116, 94, 123];

    function calculateAverage(arr) {
        sum = 0;
        for(let i = 0; i < arr.length; ++i) {
            sum+=arr[i];
        }
        return sum / arr.length;
    }

    johnAvg = calculateAverage(johnScores);
    mikeAvg = calculateAverage(mikeScores);
    if(johnAvg > calculateAverage(mikeAvg)) {
        console.log("John wins: " + johnAvg);
    } else if(calculateAverage(mikeScores) > calculateAverage(johnScores)) {
        console.log("Mark wins: " + mikeAvg);
    } else {
        console.log("Draw");
    }

    // Extra:
    maryScore = [97, 134, 105];
    maryAvg = calculateAverage(maryScore);

    arrAvgs = [[johnAvg, "John"], [mikeAvg, "Mike"], [maryAvg, "Mary"]];

    let max = arrAvgs[0][0];
    for(let i = 1; i < arrAvgs.length; ++i) {
        if(arrAvgs[i][0] > max) {
            max = arrAvgs[i][0];
        }
    }

    winners = [];
    for(let i = 0; i < arrAvgs.length; ++i) {
        if(arrAvgs[i][0] == max) {
            winners.push(arrAvgs[i][1]);
        }
    }
    if(winners.length == 1) {
        console.log("Winner is: " + winners[0]);
    } else {
        console.log("Tie between " + winners);
    }
}

if(functionStatements) {

    // Function as variable
    var whatDoYouDo = function(job, firstName) {
        console.log(firstName + ' works as a ' + job);
    }
    
    //similar to function whatDoYouDo(job, firstname) {...}

    whatDoYouDo('programmer', 'joe');

    //statements do not return a value, functions do
    if(whatDoYouDo) {
        console.log("Function passed as boolean is truthy");
    }

    if(!whatDoYouDo()) {
        console.log("void return functions return undefined, falsy!");
    }

}

if(arrays) {
    var names = ['John', "Mark"];   // == to var names = new Array("John", "Mark");

    names[names.length] = "Mary";   // Appends to array 

    console.log(names);

    console.log(names[100]);        //Undefined (no index errors! risky!)

    //Arrays can hold multiple types
    multipleTypeArray = ["Juann", 5, false];
    console.log(multipleTypeArray);

    //Appends to end of array
    multipleTypeArray.push(5);
    console.log(multipleTypeArray);

    //Appends to start of array
    multipleTypeArray.unshift('Mr.');
    console.log(multipleTypeArray);

    //Pops last element
    multipleTypeArray.pop();
    console.log(multipleTypeArray);

    //Pops first element
    multipleTypeArray.shift();
    console.log(multipleTypeArray);

    console.log([].pop());          //undefined, no error
    console.log([].shift());        //undefined

    //Finds index of first element that matches argument
    // -1 if not found
    multipleTypeArray.push(false);
    console.log(multipleTypeArray.indexOf(false));
}

if(codeChallenge3) {
    // Tip calculator

    var bills = [124, 48, 268];
    var tips = []
    var totalCost = []
    for(var index in bills) {
        var cost = bills[index];
        var tipPercentage;
        if(cost < 50){
            tipPercentage = 0.2;
        } else if(cost < 200) {
            tipPercentage = 0.15;
        } else {
            tipPercentage = 0.1;
        }
        tips.push(cost*tipPercentage);
        totalCost.push(cost + (cost*tipPercentage));
    }

    console.log(bills);
    console.log(tips);
    console.log(totalCost);

}

if(objectStuff) {
    // Objects and properties
    // traditional key/value dictionary
    var john = {
        name : 'John',
        age : 12
    }

    console.log(john.name);
    console.log(john["name"]);
    var x = "name";
    console.log(john[x]);

    var jane = new Object();
    jane.name = "Jane";
    jane.age = 10;

    console.log(jane.name);
    console.log(jane.nonExistentElement) // undefined

    var mike = {
        name : 'Mike',
        age : 15,
        // Object functions
        getAge: function() {
            this.getAgeCalled = true;
            return this.age;
        }
    }

    console.log(mike.getAge());
    console.log(mike.getAgeCalled);
}

if(codeChallenge4) {

    var john = {
        name : 'John',
        height: 1.7,
        mass: 70,
        bmi: 0,
    };

    var mark = {
        name : 'Mark',
        height: 1.65,
        mass: 61,
        bmi: 0,
    };

    function calculateBMI(person){
        person.bmi = person.mass / (person.height * person.height);
    }

    calculateBMI(john);
    calculateBMI(mark);

    console.log(john);
    console.log(mark);
}

if(loops) {

    for(let i = 0; i < 10; ++i) {

        if(i == 5) {
            continue;   // 5 is not printed
        }
        console.log(i);
    }
}

if(codeChallenge5) {

    var john = {
        name : "John",
        bills : [124, 48, 268, 180, 42],
        
        calcTips : function() {
            this.tips = [];
            this.finalValues = [];

            for(var i in this.bills) {
                var bill = this.bills[i];
                var tip;
                if(bill < 50) {
                    tip = bill * 0.2;
                } else if(bill < 200) {
                    tip = bill * 0.15;
                } else {
                    tip = bill * 0.1;
                }
                this.tips.push(tip);
                this.finalValues.push(tip + bill);
            }
            var sum = 0;
            for(let i in this.tips) {
                sum += this.tips[i];
            }
            this.avgTip = sum / this.finalValues.length;
        }
    };

    john.calcTips();
    console.log(john);

    // False is stored in index 10 (10 previous empty values)
    var arr = []
    arr[10] = false;
    console.log(arr);
    for(var i in arr) {
        console.log(arr[i]); // only false is printed
    }
}