/*jshint esversion: 6 */

class Character {
  constructor(name, img, strength, intelligence, humor, cuteness){
    this.name = name; 
    this.img = img;
    this.strength = strength;
    this.intelligence = intelligence;
    this.humor = humor;
    this.cuteness = cuteness;
  }
}

// C H A R A C T E R S

// Character Images
let imgNonBinary = "../img/images.jpeg";
let imgPinkKirby = "../img/DJY6Lz2.png";
let imgLinkHero = "../img/link.png";
let imgDumbZombie = "../img/assets-2029818_960_720.png";
let imgCuteMonster = "../img/cuteMonster.jpg";
let imgStrongWarrior = "../img/strongWarrior.jpg";
let imgBlooper = "/img/Blooper_MK7.png";
let imgCrazyCat = "/img/cat.gif";

// Characters

let crazyCat = new Character(
  "Crazy Cat", // Name
  imgCrazyCat, // Image
  3, // Strength
  7, // Intelligence
  3, // Humor
  5 // Cuteness
);

let blooper = new Character(
  "Blooper", // Name
  imgBlooper, // Image
  3, // Strength
  4, // Intelligence
  9, // Humor
  8 // Cuteness
);

let nonBinary = new Character(
  "Non Binary", // Name
  imgNonBinary, // Image
  4, // Strength
  5, // Intelligence
  9, // Humor
  8 // Cuteness
);

let pinkKirby = new Character(
  "Pink Kirby", // Name
  imgPinkKirby, // Image
  4, // Strength
  5, // Intelligence
  9, // Humor
  8 // Cuteness
);

let linkHero = new Character(
  "Link Hero", // Name
  imgLinkHero, // Image
  7, // Strength
  10, // Intelligence
  5, // Humor
  2 // Cuteness
);

let dumbZombie = new Character(
  "Dumb Zombie", // Name
  imgDumbZombie, // Image
  7, // Strength
  1, // Intelligence
  6, // Humor
  2 // Cuteness
);

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

let cardsDatabase = [
  cuteMonster,
  strongWarrior,
  linkHero,
  dumbZombie,
  nonBinary,
  pinkKirby,
  blooper,
  crazyCat
];