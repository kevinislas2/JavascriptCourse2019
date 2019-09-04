// Chalenges:

// A player looses his ENTIRE score when he rolls two 6 in a row.
// Add an input field to the HTML where players can set the winning score TODO
// Add another dice to the game so that each turn throws two dices TODO

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, 
    roundScore, 
    activePlayer, 
    gameFinished, 
    winningScore,
    lastNumber;

function rollDice() {
    return Math.floor(Math.random()*6) + 1;
}

// Handles turns
function nextTurn(hideDice) {
    if(hideDice) {
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
    }

    for(let i = 0; i < 2; ++i) {
        var playerTextDOM = document.querySelector('.player-'+i+'-panel');
        playerTextDOM.classList.toggle('active');
    }
    activePlayer = (activePlayer + 1)%2;
    lastNumber = 0;
}

function alertGameEnded() {
    alert("Player " + (activePlayer+1) + " already won, game finished");
}

// Sets initial variables
function InitializeGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameFinished = false;
    lastNumber = 0;

    //Hide dice
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    for(let i = 0; i < 2; ++i) {
        document.querySelector(".player-"+i+'-panel').classList.remove('winner');
        document.querySelector(".player-"+i+'-panel').classList.remove('active');
        document.querySelector('#name-'+i).textContent = "Player "+(i+1);

        //Set to 0 round and overall score
        document.querySelector('#current-'+i).textContent = 0;
        document.querySelector('#score-'+i).textContent = 0;
    }
    document.querySelector('.player-0-panel').classList.add('active');
}


// Rolls dice
document.querySelector('.btn-roll').onclick = function() {

    function endRound(hideDice) {
        roundScore = 0
        currRoundDOM.textContent = '0';
        nextTurn(hideDice);
    }

    if(!gameFinished) {
        var dices = [0, 0]

        for(let i = 0; i < dices.length; ++i) {
            var dice = rollDice();
            dices[i] = dice;
            var diceDOM = document.querySelector('#dice-'+(i+1));
            diceDOM.style.display = 'block';
            diceDOM.setAttribute('src', 'dice-'+dice+'.png');
        }

        var currRoundDOM = document.querySelector('#current-'+activePlayer);

        var dice = dices[0] + dices[1];

        if(lastNumber === 6 && dice === 6) {

            alert("Bad luck! You had two consecutive 6s \
                so you lose your turn and all your points");
            // Get current player score
            playerScoreDOM = document.querySelector('#score-'+activePlayer);
            scores[activePlayer] = 0;
            // Update text
            playerScoreDOM.textContent = scores[activePlayer];
            endRound(true);

        } else {
            lastNumber = dice;

            //Round ends
            if(dices[0] === 1 || dices[1] == 1) {
                endRound(false);
            } else {
                roundScore += dice
            }
        }
        currRoundDOM.textContent = roundScore;

    } else {
        alertGameEnded()
    }

}

// Stores round score
document.querySelector('.btn-hold').onclick = function() {

    if(!gameFinished) {
        var currRoundDOM = document.querySelector('#current-'+activePlayer);
        if(roundScore != 0) {

            // Get current player score
            playerScoreDOM = document.querySelector('#score-'+activePlayer);
    
            // Add scores
            scores[activePlayer] += roundScore;
    
            // Update text
            playerScoreDOM.textContent = scores[activePlayer];
    
            // Set roundscore and update text
            roundScore = 0;
            currRoundDOM.textContent = roundScore;
            
            var input = parseInt(document.querySelector('.final-score').value);
            var winningScore = 100;
            if(!!input) {
                winningScore = input;
            }

            //Check if player won the game
            if(scores[activePlayer] >= winningScore) {
                alert("Player " + (activePlayer+1) + " won!");
                gameFinished = true;
                document.querySelector(".player-"+activePlayer+'-panel').classList.add('winner');
                document.querySelector(".player-"+activePlayer+'-panel').classList.remove('active');
                document.querySelector('#name-'+activePlayer).textContent = "Winner!";
            } else {
                nextTurn(true);
            }
        }
    } else {
        alertGameEnded()
    }
}

document.querySelector('.btn-new').onclick = function() {
    InitializeGame();
}

window.onload = function() {
    InitializeGame();
    var instructions = 'Bienvenido al juego de dados \n \
Las reglas del juego son las siguientes:\n \
Cada jugador tira los dados y acumula puntos temporalmente(current)\n \
Si alguno de los dos dados sale 1, el jugador pierde los puntos (current) \n \
Y su turno termina \n \
El jugador puede almacenar sus puntos current en su marcador dando click en hold (su turno termina)\
El primero en llegar a 100 puntos gana!';

    alert(instructions);
}
