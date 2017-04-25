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
  res.sendFile('/stylesheets/style.css', { root : __dirname + '/../public/' })
});

router.get('/users/:name', function(req, res) {
  var list = tweetBank.find( {name: req.params.name} );
  res.render( 'index', { 
    title: 'Twitter.js',
    tweets: list,
    showForm: true,
    name: req.params.name
  });
});

router.get('/users/id/:id', function(req, res) {
  var id = req.params.id;
  console.log("WE HAVE AN ID", id)
  var list = tweetBank.find( {id: id} );
  res.render( 'index', { list: list } );
});

module.exports = router;