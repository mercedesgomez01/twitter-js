const express = require( 'express' );
const app = express(); // creates an instance of an express application
const chalk = require('chalk');
const morgan = require('morgan');
const nunjucks = require('nunjucks')
const routes = require('./routes')
var path = require('path');
const bodyParser = require('body-parser');

//parse url. used for body from html form
//we can access body variables like req.body.name and req.body.content
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// app.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   //find a way to send status on middleware
//   next()
// })

// app.use("/special/", function (req, res, next) {
//   console.log("You are entering a special area")
//   next()
// })

app.use(morgan('combined'))
app.use('/', routes)
app.use('/public', express.static(path.join(__dirname, '/public')))



app.listen(3000, function () {
  var stringz = 'Example app listening on port 3000!'
  console.log(chalk.red(stringz))
})

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper directory for templates

// in some file that is in the root directory of our application... how about app.js?
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.render('index.html', locals, function (err, output) {
    //console.log(output);
});