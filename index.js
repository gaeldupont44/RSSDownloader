
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
app.use(express.static('public'));
var socketio = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
  serveClient: true,
  path: '/socket.io-client'
});

require('./routes')(app, socketio);

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(6666, function () {
  console.log('Example app listening on port 6666!');
});

