/*jshint esversion: 6 */

class Game {
  constructor(cardsArray){
    this.cardsArray = cardsArray;
    this.currentPlayer = {};
    this.currentPhase = 0;
  }

  rollTheDice() {
    let i,
        faceValue,
        sum = 0,
        output = '',
        diceCount = 2;
    for (i = 0; i < diceCount; i++) {
        faceValue = Math.floor(Math.random() * 6);
        console.log(faceValue);
        output += "&#x268" + faceValue + "; ";
        sum += faceValue+1;
    }
    console.log(sum);
    document.getElementById('dice').innerHTML = output;
  }
}