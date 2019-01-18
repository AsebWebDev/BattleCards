/*jshint esversion: 6 */

let game = new Game();
let player1 = new Player();
let player2 = new Player();


// Character Images
let imgCuteMonster = "../img/cuteMonster.jpg";
let imgStrongWarrior = "../img/strongWarrior.jpg";

// Characters
let cuteMonster = new Character(
  "Cute Monster", // Name
  imgCuteMonster, // Image
  3, // Strength
  2, // Intelligence
  6, // Humor
  10 // Cuteness
);

let strongWarrior = new Character(
  "Strong Warrior", // Name
  imgStrongWarrior, // Image
  10, // Strength
  2, // Intelligence
  1, // Humor
  1 // Cuteness
);

game.cardsArray.push(
  cuteMonster, strongWarrior
);


// F U N C T I O N S

function findWinner (battleCardProp1, battleCardProp2){
  if (battleCardProp1 === battleCardProp2) return 0;    // returns 0, if equal
  else if (battleCardProp1 > battleCardProp2) return 1; // returns 1, if Winner is Player1
  else if (battleCardProp1 < battleCardProp2) return 2; // returns 2, if WInner is Player 2
}