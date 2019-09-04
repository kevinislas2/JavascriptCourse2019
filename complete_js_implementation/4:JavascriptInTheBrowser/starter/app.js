/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameFinished, winningScore;

function rollDice() {
    return Math.floor(Math.random()*6) + 1;
}

// Handles turns
function nextTurn(hideDice) {
    if(hideDice) {
        document.querySelector('.dice').style.display = 'none';
    }

    for(let i = 0; i < 2; ++i) {
        var playerTextDOM = document.querySelector('.player-'+i+'-panel');
        playerTextDOM.classList.toggle('active');
    }
    activePlayer = (activePlayer + 1)%2;
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
    winningScore = 200;

    //Hide dice
    document.querySelector('.dice').style.display = 'none';

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

    if(!gameFinished) {
        var dice = rollDice();

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.setAttribute('src', 'dice-'+dice+'.png');
    
        var currRoundDOM = document.querySelector('#current-'+activePlayer);
        //Round ends
    
        if(dice === 1) {
            roundScore = 0
            currRoundDOM.textContent = '0';
            nextTurn(false);
        } else {
            roundScore += dice
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
}
