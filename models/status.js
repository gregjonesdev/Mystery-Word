let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]

/* all letters stored in lower case */
let lettersGuessed = []



/* Return false if this letter has already been guessed */
const newGuess = function(letter){

console.log("We received your guess as: " + letter)

if (lettersGuessed.indexOf(letter.toLowerCase())==-1) {
  lettersGuessed.push(letter.toLowerCase())
  console.log("Now lettersGuessed array is: " + lettersGuessed)
  return true;
}
console.log(letter + " has already been guessed!")
return false;
}


module.exports = {
guesses: guesses, //number of guesses remaining
lettersGuessed: lettersGuessed,
//guess: guess,

newGuess: newGuess
// this will be a function to call when the user guesses a letter. It needs to:
//       1. check if the letter has already been guessed
//       2. check if the letter is contained in the mysteryword
//       3.
}
