'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var FeedSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});

module.exports = mongoose.model('Feed', FeedSchema);