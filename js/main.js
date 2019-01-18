/*jshint esversion: 6 */

// G A M E    I N I T

let game = new Game(cardsArray);
let player1 = new Player();
let player2 = new Player();

printCharacters();

// F U N C T I O N S

function findWinner (BC1property, BC2property){
  if (BC1property === BC2property) return 0;    // returns 0, if equal
  else if (BC1property > BC2property) return 1; // returns 1, if Winner is Player1
  else if (BC1property < BC2property) return 2; // returns 2, if WInner is Player 2
}