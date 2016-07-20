'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;
 
var FeedSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});
 
FeedSchema.statics = {
  loadAll: function(userid, cb) {
    this.find({user: new ObjectId(userid)})
      .sort('-date')
      .populate({path:'user', select: 'name'})
      .exec(cb);
  },
  loadOne: function(id, cb) {
    this.findById(id)
      .populate({path:'user', select: 'name'})
      .exec(cb);
  }
};
 
module.exports = mongoose.model('Feed', FeedSchema);
