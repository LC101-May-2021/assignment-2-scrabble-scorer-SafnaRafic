// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
 word = input.question("Enter a word ");
 oldScrabbleScorer(word)
 
};

let simpleScore = function(word){
  return word.length;
}

let vowelBonusScore = function(word){
  let score = 0;
  for(let i=0;i<word.length;i++){
  if(word[i].includes('a')||word[i].includes('e')||word[i].includes('i')||word[i].includes('o')||word[i].includes('u')){
    score+=3;
  }else {
    score += 1;
  }
  }
  return score;
}

let scrabbleScore = function(word){  
	let score = 0; 
	for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]]; 
	  }	
	return score;
}

const scoringAlgorithms = [
  
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1pt",
    scoringFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
  }
];
function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system `);
let index =-1; 
while(index <0 || index > 2){
  index = input.question("Enter 0, 1, or 2: ");
}
  return index;
}


function transform(oldPointStructure) {
  let newPointStructure = {};
  for(let score in oldPointStructure ){
    let letters = oldPointStructure[score];
    for (let i=0; i<letters.length; i++){
        newPointStructure[letters[i].toLowerCase()] = Number(score);
      }    
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   let index = scorerPrompt();
   console.log(`Score for ${word} : ${scoringAlgorithms[index].scoringFunction(word)}`);

  //  console.log(oldScrabbleScorer(word))
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

