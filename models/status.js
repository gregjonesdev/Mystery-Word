
const gameCheck = function(){
  return "ok, this works"
}

let guessesLeft = 8;

const makeAGuess = function(){
  return "make a guess function"
}

let guessNumber= [true,true,true,true,true,true,true,true]


module.exports = {
//check: gameCheck
check: "hi from status.js",
guesses: guessNumber, //number of guesses remaining
lettersGuessed: [],
guess: makeAGuess
// this will be a function to call when the user guesses a letter. It needs to:
//       1. check if the letter has already been guessed
//       2. check if the letter is contained in the mysteryword
//       3.
}



//
// let lettersGuessed = []
