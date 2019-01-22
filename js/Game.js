/*jshint esversion: 6 */

class Game {
  constructor(cardsArray){
    this.cardsArray = cardsArray;
    this.currentPlayer = {};
    this.currentPropertyInBattle = null;
    this.currentPhase = 0;
    this.currentRound = 1;
    this.roundsToPlay = 1;
  }

  rollTheDice() {
    let i,
        faceValue,
        sum = 0,
        output = '',
        diceCount = 2;
    for (i = 0; i < diceCount; i++) {
        faceValue = Math.floor(Math.random() * 6);
        output += "&#x268" + faceValue + "; ";
        sum += faceValue+1;
    }
    document.getElementById('dice').innerHTML = output;
    return sum;
  }

  diceCurrentPlayer() {
    game.currentPlayer.currentDiceValue = game.rollTheDice();
    setTimeout(() => {
      $("#dice").text("");
    }, 1200);
    game.switchPlayer();
  }

  checkGameOver() {
    if (game.currentRound === game.roundsToPlay) {
      let winner;
      if (player1.score === player2.score){
        $("#infobox button").text("Game over! Score is equal. Please choose who is best in a proper fist fight");
      } else {
        if (player1.score > player2.score) winner = player1;
        else winner = player2;
        $("#infobox button").text("Game over! The winner is " + winner.name);
      }
    return true;
    } else return false;
  }

  cleanBattlefield() {
    $("#battle-field .bc").remove();
    player1.currentCardInBattle = null;
    player2.currentCardInBattle = null;
    player1.currentDiceValue = null;
    player2.currentDiceValue = null;
    game.currentPropertyInBattle = null;
    $("dice div").hide();
  }

  switchPlayer() {
    if (game.currentPlayer === player1) {
      game.currentPlayer = player2;
    } else if (game.currentPlayer === player2) {
      game.currentPlayer = player1;
    }
    $("#p1-board").toggleClass("selected");
    $("#p2-board").toggleClass("selected");
    $("#infobox button").text("Your turn "+game.currentPlayer.name);
  }

  updateBoard(){
    $("#infobox button").text("Your turn "+game.currentPlayer.name);
    $("#p1-score").text(player1.score);
    $("#p2-score").text(player2.score);
  }

  findWinner(BC1property, BC2property) {
    if (BC1property === BC2property) {
      console.log("Equal!");
      game.switchPlayer();
  
    } else if (BC1property > BC2property) {
        console.log(player1.name + " won!");
        game.currentPlayer = player1;
  
    } else if (BC1property < BC2property) {
        console.log(player2.name + " won!");
        game.currentPlayer = player2;
    }
    player1.score += BC1property;
    player2.score += BC2property;
  }
}