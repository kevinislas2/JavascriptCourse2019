/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question.
A question should include:
a) question itself
b) the answers from which the player can choose the correct one 
    (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with
    the possible answers (each question should have a number) 
    (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. 
    The user should input the number of the correct answer such as you 
    displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the 
    answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use 
    in their code. So make sure that all your code is private and 
    doesn't interfere with the other programmers code 
    (Hint: we learned a special technique to do exactly that).
*/

// Hide variables by putting everything in a function and calling it
( function() {
    function Question(text, answers, correctAnswerIndex) {
        this.text = text;
        this.answers = answers;
        this.correctAnswerIndex = correctAnswerIndex;
        this.logToConsole = function() {
            console.log(text);
            for(var answerIndex = 0; answerIndex < answers.length; ++ answerIndex) {
                console.log( (answerIndex+1) + ": " + answers[answerIndex]);
            }
        };
        this.str = function(score) {
            var t = score + '\n';
            t += text + '\n' // to force pass by copy;
            for(var answerIndex = 0; answerIndex < answers.length; ++ answerIndex) {
                t += (answerIndex+1) + ": " + answers[answerIndex] + '\n';
            }
            t += 'type "exit" to end';
            return t;
        }
    };

    var questions = [
        new Question(
            'What is 8*8?',
            [10, 64, 72, 56],
            1
        ),
        new Question(
            'What language does this course cover?',
            ['Python', 'C++', 'Javascript'],
            2
        ),
        new Question(
            'What is the answer to life, the universe and everything?',
            ['Finding love', 'Being happy', 'Each one defines his own meaning', '42'],
            3
        ),
    ];
    
    function logOutput(text) {
        console.log(text);
        document.querySelector('#outputText').textContent = text;
    }

    var userAnswer;
    var score = 0;
    while(userAnswer != 'exit') {
        // Select a random question
        var q = questions[Math.floor(Math.random() * questions.length)];
        q.logToConsole();

        userAnswer = prompt(q.str(score));

        if(parseInt(userAnswer)-1 === q.correctAnswerIndex) {
            ++score;
        }
    }
    logOutput("Score: " + score);
})();