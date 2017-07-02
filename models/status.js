let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]
//let guesses
/* all letters stored in lower case */
let lettersGuessed = []

let hiddenWord = []

const newHidden = function(word) {
 hiddenWord = []
 lettersGuessed = []
  for (i=0; i<word.length; i++) {
    hiddenWord[i]=""
  }
  return hiddenWord
}

/* Return false if this letter has already been guessed */
const newGuess = function(letter){
  if (lettersGuessed.indexOf(letter.toLowerCase())==-1) {
    lettersGuessed.push(letter.toLowerCase())
    return true;
  }
  return false;
}

const checkLetter = function (letter, mysteryWord) {
  //if mystery word contains that letter, display it and return true
  if (mysteryWord.indexOf(letter.toLowerCase())==-1) {
    return false
  }
  return true
}

// const wrongGuess = function(){
//   guesses.pop()
//   return guesses
// }

const rightGuess = function(letter, mysteryWord, hiddenWord) {

  for (i=0; i<mysteryWord.length; i++) {
    if (mysteryWord[i]==letter.toLowerCase()){
      hiddenWord[i] = letter.toLowerCase()
    }
  }

}

const winCheck = function (hiddenWord) {
  for (i=0; i<hiddenWord.length; i++) {
    if (hiddenWord[i]=="") {
      return false
    }
  } return true;
}


module.exports = {
guesses: guesses, //number of guesses remaining
lettersGuessed: lettersGuessed,
checkLetter: checkLetter,
newHidden: newHidden,
hiddenWord: hiddenWord,
newGuess: newGuess,
//wrongGuess: wrongGuess,
rightGuess: rightGuess,
winCheck: winCheck
}
