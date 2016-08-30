'use strict';

const EventEmitter =  require('events');
const Article = require('./article.model');
const ArticleEvents = new EventEmitter();


// Set max event listeners (0 == unlimited)
ArticleEvents.setMaxListeners(0);

// Model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Article.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ArticleEvents.emit(event, doc);
  };
}

module.exports = ArticleEvents;