'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Article = require('./article/article.model'),
    ObjectId = mongoose.Types.ObjectId;
 
var FeedSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  articles: [Article.schema]
});
 
module.exports = mongoose.model('Feed', FeedSchema);