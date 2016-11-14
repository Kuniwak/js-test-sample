var util = require('util');
var createServer = require('./server');

var PORT = process.env.PORT || 3000;
var HOSTNAME = process.env.HOSTNAME || 'localhost';

createServer(PORT, HOSTNAME).start()
  .then(function() {
    console.log(util.format('http://%s:%d にブラウザでアクセスしてください'), HOSTNAME, PORT);
  })
  .catch(function(err) {
    console.error(err);
  });
