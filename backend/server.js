// Entry point for express backend

'use strict';

var app = require('./app');
var http = require('http');

var port = process.env.PORT || 3000;

http.createServer(app).listen(port, function () {
  console.log('Express server listening on ' + port);
});
