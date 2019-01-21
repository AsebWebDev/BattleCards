/*jshint esversion: 6 */

class Player {
  constructor(name){
    this.name = name;
    this.currentCards = [];
    this.currentCardInBattle = null;
    this.currentPropertyInBattle = null;
    this.score = 0;
    this.scoreArray = [];
    this.currentDiceValue = 0;
  }
}