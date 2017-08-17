
'use strict';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./UserSchema');

// API to increment integer
router.post('/nextInt', function (req, res) {
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, { $inc: { currInt: 1 } }, { new: true }, function (err) {
      if (err) { return res.status(500).send('Problem getting next integer.'); }
      res.status(200).json({
        currInt: req.user.currInt
      });
    });
  } else {
    return res.status(500).send(' Not logged in!');
  }
});

// API to reset integer
router.post('/changeInt', function (req, res) {
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, { $set: { currInt: req.body.currInt } }, { new: true }, function (err) {
      if (err) { return res.status(500).send('Problem updating current integer to new integer'); }
      res.status(200).json({
        currInt: req.user.currInt
      });
    });
  } else {
    return res.status(500).send(' Not logged in!');
  }
});

// API to get current integer
router.get('/getInt', function (req, res) {
  if (req.user) {
    res.status(200).json({
      currInt: req.user.currInt
    });
  } else {
    return res.status(500).send(' Not logged in!');
  }
});

module.exports = router;
