'use strict';

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser')
var Path = require('path');

var PUBLIC_DIR = Path.join(__dirname, 'public');

var app = express();
app.use(express.static(PUBLIC_DIR));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/click', function(req, res) {
  res.end();
  console.log('"%s"が入力されました', String(req.body.text));
});


module.exports = function createServer(port, hostname) {
  var server = require('http').createServer(app);

  var startPromise = new Promise(function(resolve, reject) {
    server.on('listening', function() {
      resolve();
    });

    server.on('error', function(error) {
      reject(error);
    });
  });


  var stopPromise = startPromise.then(function() {
    return new Promise(function(resolve, reject) {
      server.on('close', function() {
        resolve();
      });

      server.on('error', function(error) {
        reject(error);
      });
    });
  });


  return {
    start: function() {
      server.listen(port, hostname);
      return startPromise;
    },

    stop: function() {
      server.close();
      return stopPromise;
    }
  };
};
