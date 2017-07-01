const express = require ('express')
const router = express.Router()
const status = require('../models/status.js')

router.use(function(req, res, next){
  console.log("middleware to authenticate the player")
  //check authentication here. if none, redirect to welcome


  console.log("What is this message? " + status.check)
  next()
})

router.all('*', function(req, res){
//   console.log("render game page")
//   console.log("What is that message? " + status.check)
//
   res.render('game')
 })


module.exports = router
