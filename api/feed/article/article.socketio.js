/**
 * Broadcast updates to client when the model changes
 */

'use strict';

const ArticleEvents = require('./article.events');
const process = require('./article.process');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function (socketio) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(event, socketio);
    ArticleEvents.on(event, listener);
  }
  process.start();
};

function createListener(event, socketio) {
  return function(doc) {
  	process.on(event, doc);
    socketio.emit('article:' + event, doc);
  };
}