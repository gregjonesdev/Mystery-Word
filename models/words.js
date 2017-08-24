const fs = require('fs')

let allWords = require('word-list-google')
let words = []

for(i=0; i<1000; i++) {
  if (allWords.englishUsaNoSwears[i].length>4 && allWords.englishUsaNoSwears[i].length <10) {
    words.push(allWords.englishUsaNoSwears[i])
  }
}

console.log(words)
//const allWords = fs.readFileSync(wordlist, "utf-8").toLowerCase().split("\n")
let mysteryWord = function (i) {
  return allWords[i].split("")
}

module.exports = {
  new: mysteryWord,
  length: allWords.length
}
