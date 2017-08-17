'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./UserSchema');

// Passport.js documentation
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
  function (email, password, done) {
    User.getUserByEmail(email, function (err, email) {
      if (err) throw err;
      if (!email) {
        console.log('unknown email');
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

passport.serializeUser(function (user, done) {
    console.log("serializing");
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log("deserializing");
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/signup', function (req, res) {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    currInt: 0
  });
  User.find({ email: newUser.email }, function (err, docs) {
    if (docs.length) {
      console.log('email exists already');
      
      res.end();
    } else {
      User.createUser(newUser, function (err, user) {
        if (err) throw err;
        console.log('New User', user);
      });
      console.log(newUser);
      res.end();
      
    }
  });
});

router.post('/login', passport.authenticate('local', {}),
  function (req, res) {
    console.log('login successful');
    res.end();
  });

router.get('/logout', function (req, res, next) {
  if (req.user) {
    req.logout();
    console.log('you are logged out');
  } else {
    console.log('you are already logged out');
    next();
  }
  //res.redirect('./login');
});

// Testing endpoint
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
      if (err) return res.status(500).send("There was a problem finding the users.");
      res.status(200).send(users);
  });
});

module.exports = router;

