'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./UserSchema');

// Passport.js documentation: Used for local authentication
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
  function (email, password, done) {
    User.getUserByEmail(email, function (err, email) {
      if (err) throw err;
      if (!email) {
        return done(null, false, {message: 'Unknown Email'});
      }
    User.comparePassword(password, email.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, email);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
    });
  }));

// Serialize/Deserialize allows login sessions and cookies
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

// Register as a new user
router.post('/signup', function (req, res) {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    currInt: 0
  });
  User.find({ email: newUser.email }, function (err, docs) {
    if (docs.length) {
      res.end();
    } else {
      User.createUser(newUser, function (err, user) {
        if (err) throw err;
      });
      console.log(newUser);
      res.end();
    }
  });
});

// Login as a user
router.post('/login', passport.authenticate('local', {}),
  function (req, res) {
    res.end();
  });

module.exports = router;

