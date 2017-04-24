const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const style = '../public/stylesheets/style';

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/stylesheets/style.css', function (req, res, next){
  console.log("WKERKJELRK!!!!!!!!!!!!!!!!!!!!")
  res.sendFile('/stylesheets/style.css', { root : __dirname + '/../public/' })
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { list: list } );
});

module.exports = router;