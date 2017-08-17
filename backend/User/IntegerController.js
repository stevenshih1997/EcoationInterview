
'use strict';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./UserSchema');

router.post('/nextInt', function (req, res) {
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, { $inc: { currInt: 1 } }, { new: true }, function (err, res) {
      if (err) { return res.status(500).send('Problem getting next integer.'); }
      console.log(res);
      //return res.status(200).send(res);
    });
  } else {
    console.log('User not logged in');
    //return res.status(500).send(' Not logged in!');
  }
});

router.post('/changeInt', function (req, res) {
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, { $set: { currInt: req.body.currInt } }, { new: true }, function (err, res) {
      if (err) { return res.status(500).send('Problem updating current integer to new integer'); }
      //return res.status(200).send(res);
      console.log(res);
    });
  } else {
    //return res.status(500).send(' Not logged in!');
    console.log('User not logged in');
  }
});

router.get('/getInt', function (req, res) {
  if (req.user) {
    console.log(req.user.currInt);
    return req.user.currInt;
    res.end();
  } else {
    console.log('User not logged in');
  }
});

module.exports = router;
