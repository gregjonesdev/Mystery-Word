let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]
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

const newGuess = function(letter){
  if (lettersGuessed.indexOf(letter.toLowerCase())==-1) {
    lettersGuessed.push(letter.toLowerCase())
    return true;
  }
  return false;
}

const checkLetter = function (letter, mysteryWord) {
  if (mysteryWord.indexOf(letter.toLowerCase())==-1) {
    return false
  }
  return true
}

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
guesses: guesses,
lettersGuessed: lettersGuessed,
checkLetter: checkLetter,
newHidden: newHidden,
hiddenWord: hiddenWord,
newGuess: newGuess,
rightGuess: rightGuess,
winCheck: winCheck
}
