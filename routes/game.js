const express = require ('express')
const router = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const status = require('../models/status.js')
const mysteryWord = require('../models/words.js')


let word
let guesses

/*Note request here is just a paramater */
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
  updateState(req)
  //req.session.mysteryWord = word
  //req.session.guesses = guesses
  console.log("req.session.mysteryWord: " + req.session.mysteryWord)
  next()
})

router.get('*', function(req, res){
  console.log("Router checkpoint 4: ")
  res.render('game', {guesses: guesses, word: word})

})

/* What will happen if user does a post/guess? */

let error = false

router.post('/guess', function(req, res){



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
    return res.render('game', {guesses: guesses, word: word, message: error[0].msg})
 }

/* if error is still false, enter this as a guess*/
 if(!error) {
   console.log("Ok, that looks like a good guess")

 }
  // res.render('game', {guesses: guesses, word: word})
  //
  // console.log("initial: " + status.lettersGuessed)
  // status.lettersGuessed.push("A") THIS WORKS!
  // console.log("after push: " + status.lettersGuessed)
  //res.render('game', {guesses: guesses, word: word, message: error})
  //res.send(req.validationErrors())
})







module.exports = router
