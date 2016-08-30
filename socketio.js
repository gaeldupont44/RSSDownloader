/**
 * Socket.io configuration
 */
'use strict';

// When the user disconnects.. perform this
function onDisconnect(socket) {
	console.log("socket disconnected");
}

// When the user connects.. perform this
function onConnect(socket, users) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });
  
  // Insert sockets below
  //require('../api/th0r/torrent/torrent.socket').register(socket);
}

module.exports = function(socketio) {
	
  require('./api/feed/article/article.socketio').register(socketio);
  require('./api/file/file.process')(socketio);
  
  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();
	
    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      console.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    console.log(socket.address + ': CONNECTED');
  });
};
