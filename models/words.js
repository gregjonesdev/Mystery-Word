const fs = require('fs')

let allWords = require('word-list-google')
let words = []

for(i=0; i<1000; i++) {
  if (allWords.englishUsaNoSwears[i].length>4 && allWords.englishUsaNoSwears[i].length <10) {
    words.push(allWords.englishUsaNoSwears[i])
  }
}

//const allWords = fs.readFileSync(wordlist, "utf-8").toLowerCase().split("\n")
let mysteryWord = function (i) {
  return words[i]
}

module.exports = {
  new: mysteryWord,
  length: words.length
}
