'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
    
var ArticleSchema = new Schema({
  feed: { type: ObjectId, ref: 'Feed', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  progress: { type: Number, default: -1, required: true },
  hash: { type: String, required: false },
  size: { type: Number, default: -1, required: true },
  transferred: { type: Number, default: -1, required: true },
  speed: { type: Number, default: -1, required: true },
  eta: { type: Number, default: -1, required: false },
  state: { type: String, default: "NEW", required: true }
});
 
module.exports = mongoose.model('Article', ArticleSchema);