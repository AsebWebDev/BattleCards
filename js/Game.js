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
}