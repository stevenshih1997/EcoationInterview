
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true
  },
  password: String,
  currInt: {
    type: Number,
    min: 0,
    max: Number.MAX_SAFE_INTEGER
  }
});

var User = module.exports = mongoose.model('UserSchema', UserSchema);

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByEmail = function (mainEmail, callback) {
  var query = { email: mainEmail };
  User.findOne(query, function (err, email) {
    callback(err, email);
  });
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, function (err, idCb) {
    callback(err, idCb);
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
      if (err) throw err;
      callback(null, isMatch);
  });
};


