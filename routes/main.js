const express = require ('express')
const router = express.Router()
const gameRouter = require ('./game.js')


const status = require('../models/status.js')

router.get('/', function(req, res) {

res.render('welcome')
})

router.use('/game', gameRouter)

router.post('/launch', function (req, res){

  //Assign state values here
  console.log("status.check from inside post/launch: " + status.check)
  res.redirect('/game')
})

module.exports = router
