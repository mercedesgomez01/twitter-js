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
  let list = tweetBank.find( {name: req.params.name} );
  res.render( 'index', { 
    title: 'Twitter.js',
    tweets: list,
    showForm: true,
    name: req.params.name
  });
});

router.get('/tweets/:id', function(req, res) {
  let list = tweetBank.find( {id: Number(req.params.id)} );
  console.log("TWEETS for that ID", req.params.id, list)
  res.render( 'index', { 
    title: 'Twitter.js',
    tweets: list
  } );
});

module.exports = router;