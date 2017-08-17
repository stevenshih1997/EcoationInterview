// Express server main point

'use strict';

var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var UserController = require('./User/UserController');
var IntegerController = require('./User/IntegerController');

require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Set passport middleware (persistent login session)
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/user', UserController);
app.use('/user', IntegerController);

app.get('/user', function (req, res) {
  console.log('api endpoint');
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
