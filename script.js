'use strict';

/*
GAME RULES :
- Game has 2 players,  playing in rounds
-In each turn, a player  rolls a dice as many times as he wishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1 , all his ROUND score gets lost. After that , it is the next player turn.
- The player can chose "Hold",  which means that hisr ROUND score gets added to his GLOBAL score. After that it is the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/ 
var scores,roundScore, activePlayer,gamePlaying,previosRoll, previosPlayer, endScore;

init();

//document.querySelector("#current-" + activePlayer).textContent = dice;

//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"

//var x = document.querySelector("#score-0").textContent;



document.querySelector(".btn--roll").addEventListener("click",function(){
   if(gamePlaying) {
    //1. Random number
    
    var dice0 = (Math.floor(Math.random() * 6)) + 1;
    var dice1 = (Math.floor(Math.random() * 6)) + 1;
    
    //1.1 save previous roll
    
    //2. Display the result
    var diceDOM0 =document.querySelector(".dice--0");
    var diceDOM1 =document.querySelector(".dice--1");
    diceDOM0.style.display = "block";
    diceDOM1.style.display = "block";
    diceDOM0.src = "dice-" + dice0 + ".png"
    diceDOM1.src = "dice-" + dice1 + ".png"

    //3. Update the round if the rolled number was not a 1
    
    if(dice === 6 && previosRoll === 6 ){
        roundScore = 0;
        dice = 0;
        document.querySelector("#score--" + activePlayer).textContent = "0";
        
        nextPlayer();
        
    }
   else if(dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector("#current--" + activePlayer).textContent = roundScore;
    }else {
        //Next player
        nextPlayer();
    }
    previosRoll = dice;
    
}})

document.querySelector(".btn--hold").addEventListener("click", function(){
    if(gamePlaying) {
    //1. add current score to global score
    scores[activePlayer] +=  roundScore;
    //2. update the UI 
    document.querySelector("#score--" + activePlayer).textContent = scores[activePlayer]
    //3. CHekc if player won the game
    if(scores[activePlayer] >= endScore){
        //change ui to player won
        document.querySelector("#name--" + activePlayer).textContent ="Winner"
        document.querySelector(".player--" + activePlayer).classList.add("player--winner");
        document.querySelector(".player--" + activePlayer).classList.remove("player--active")
        //document.querySelector(".btn--roll").style.display = "none";
        //document.querySelector(".btn--hold").style.display = "none";
        gamePlaying = false;
        //document.querySelector(".btn--roll").setAttribute("disabled","");
        //document.querySelector(".btn--hold").setAttribute("disabled", "");
    }else {
        nextPlayer();
    }
}})

function nextPlayer(){
    activePlayer === 0? activePlayer =1: activePlayer = 0;
        document.getElementById("current--0").textContent = "0";
        document.getElementById("current--1").textContent = "0";
        document.querySelector(".player--0").classList.toggle("player--active");
        document.querySelector(".player--1").classList.toggle("player--active");

        document.querySelector(".dice--0").style.display = "none";
        document.querySelector(".dice--1").style.display = "none";
        roundScore = 0;
        previosRoll = 0;
}

document.querySelector(".btn--new").addEventListener("click", init)
   
    


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    endScore = 100;
    gamePlaying = true;
    document.querySelector(".dice--0").style.display = "none";
    document.querySelector(".dice--1").style.display = "none";
    document.getElementById("score--0").textContent = "0";
    document.getElementById("score--1").textContent = "0";
    document.getElementById("current--0").textContent = "0";
    document.getElementById("current--1").textContent = "0";
    document.querySelector(".btn--roll").style.display = "block";
    document.querySelector(".btn--hold").style.display = "block";
    document.querySelector("#name--0").textContent ="Player 1"
    document.querySelector(".player--0").classList.remove("player--winner");
    document.querySelector(".player--1").classList.remove("player--winner");
    document.querySelector(".player--0").classList.add("player--active")
}

document.getElementById("max-score").addEventListener("change",function(){
    endScore = Number(document.getElementById("max-score").value)
})

/*
3 challenges

1. A player looses hit ENTIRE score when he rolls number 6 two times in row.
After that it is next player's turn; DONE
2. Add an input field to the HTML where players can set the winning score,
 so that they can change the predefined socre of 100. DONE
3. Add another dice to the game so that there are two dices */