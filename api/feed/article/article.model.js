'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var ArticleSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  finished: { type: Boolean, default: false, required: true }
});
 
module.exports = mongoose.model('Article', ArticleSchema);