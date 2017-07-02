const express = require ('express')
const router = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const status = require('../models/status.js')
const mysteryWord = require('../models/words.js')

let word //the mysteryword
let guesses
let lettersGuessed
let hiddenWord //the blanks that will reveal if a guess is a match
let inGame = [true] //to hide the guess form when game is over

/*Remembers the MysteryWord, number of guesses remaining */
const updateState = function(request) {
  request.session.mysteryWord = word
  request.session.guesses = guesses
  request.session.hiddenWord = hiddenWord
  request.session.inGame = inGame
  request.session.message = message
  request.session.lettersGuessed = lettersGuessed
}


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))

router.use(expressValidator());

router.use(function(req, res, next){
  if (!req.session.secret) {
    return res.render('welcome')
  }

  if (!word) {
    let i = Math.floor(Math.random() * mysteryWord.length)
    word = mysteryWord.new(i)
    hiddenWord = status.newHidden(word) //try add in this and the next line
  }
  guesses = status.guesses
  updateState(req)
  next()
})

router.get('*', function(req, res){
  res.render('game', {guesses: guesses, game: inGame, word: hiddenWord})
})
let error = false
let message = ""

router.post('/guess', function(req, res){

  if (guesses.length > 1) {
    req.checkBody("guess", 'Dont forget to guess a letter!').notEmpty()
    error = req.validationErrors()

    if (!error) {
      req.checkBody("guess", 'Please enter one character at a time').len(0,1)
      error = req.validationErrors()
    }

    if (!error) {
      req.checkBody("guess", 'Please enter letters only!').isAlpha()
      error = req.validationErrors()
    }

    if (error) {
      return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: error[0].msg})
   }

   /* if error is still false, enter this as a guess*/
    if(!error) {
      if (!status.newGuess(req.body.guess)) {
        message = req.body.guess + " has already been guessed!"
        //console.log("76 guesses: " + guesses.length)
        console.log("77 status.guesses " + status.guesses.length)
        return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
      } else {
          if (!status.checkLetter(req.body.guess, word)){
            //if wrong guess do something else
            message = req.body.guess + " is not in the word."
            //console.log("Guesses: " + status.guesses.length)
            //status.wrongGuess
            status.guesses.pop()
            console.log(guesses.length)
            console.log("86 guesses: " + status.guesses.length)
            //console.log("87 status.guesses " + status.guesses.length)
            return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})

          } else if (status.checkLetter(req.body.guess, word)) {
              //win check

          //    if (!status.winCheck(hiddenWord)) {
                message = req.body.guess + " was found in the word!"
                status.rightGuess(req.body.guess, word, hiddenWord)
                 // need to return modified hidden word
                 if (status.winCheck(hiddenWord)) {
                   message = "Congratulations!"
                   inGame = false
                   //console.log("99 guesses: " + guesses.length)
                   console.log("100 status.guesses " + status.guesses.length)
                   updateState(req)
                   //console.log("102 guesses: " + guesses.length)
                   console.log("103 status.guesses " + status.guesses.length)
                   guesses = status.guesses
                   return res.render('game', {word: hiddenWord, again: inGame, message: message})
                 }
                 //console.log("107 guesses: " + guesses.length)
                 console.log("108 status.guesses " + status.guesses.length)
                return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
            }
        }
    }
    return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
    updateState(req)
  }

  message = "Sorry, you lose."
  inGame = false
  hiddenWord = word
  status.guesses = guesses
  updateState(req)
  return res.render('game', {word: hiddenWord, game: inGame, message: message})
})

router.post('/again', function (req, res) {

  let i = Math.floor(Math.random() * mysteryWord.length)
  word = mysteryWord.new(i)
  status.hiddenWord = []
  hiddenWord = status.newHidden(word)
  inGame = true
  guesses = status.guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]
  console.log("Guesses at start of new game: " + guesses.length)
  message = ""
  updateState(req)
  res.render('game', {word: hiddenWord, guesses: guesses, game: inGame, message: message})
})

module.exports = router
