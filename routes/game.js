const express = require ('express')
const router = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const status = require('../models/status.js')
const mysteryWord = require('../models/words.js')


let word //the mysteryword
let guesses
let hiddenWord //the blanks that will reveal if a guess is a match
let inGame = [true] //to hide the guess form when game is over

/*Remembers the MysteryWord, number of guesses remaining */
const updateState = function(request) {
  request.session.mysteryWord = word
  request.session.guesses = guesses
}


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))

router.use(expressValidator());

router.use(function(req, res, next){
  // console.log("Router checkpoint 3: " + req.params)
  // console.log("middleware to authenticate the player")
  // check authentication here. if none, redirect to welcome
  // console.log("session secret from game router: " + req.session.secret)
  if (!req.session.secret) {
    return res.render('welcome')
  }

  /* At this point, assign a mystery word to guess */

  word = mysteryWord.new
  console.log(word + " just assigned as mystery word")
  guesses = status.guesses
  hiddenWord = status.newHidden(word) //takes mystery word, creates an array of empty strings with same length
  console.log("new hidden word: " + hiddenWord)
  updateState(req)
  //req.session.mysteryWord = word
  //req.session.guesses = guesses
  console.log("req.session.mysteryWord: " + req.session.mysteryWord)
  next()
})

router.get('*', function(req, res){
  console.log("Router checkpoint 4: ")
  res.render('game', {guesses: guesses, game: inGame, word: hiddenWord})

})

/* What will happen if user does a post/guess? */

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
      console.log("req.body.guess: " + req.body.guess)
      console.log("Ok, that looks like a good guess")


      if (!status.newGuess(req.body.guess)) {
        message = req.body.guess + " has already been guessed!"
        return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
      } else {
        if (status.checkLetter(req.body.guess, word)){
            //if correct guess do something


        } else {
        //  status.wrongGuess
          //if wrong guess do something else
          message = req.body.guess + " is not in the word."
          return res.render('game', {guesses: status.wrongGuess, game: inGame, word: hiddenWord, message: message})
        }

      }

    }
    guesses = status.guesses
    return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
    updateState(req)
  }
  //if guesses left = 0, game over
  message = "Sorry, you lose."
  inGame = [false]
  hiddenWord = word
  return res.render('game', {word: hiddenWord, message: message})
})







module.exports = router
