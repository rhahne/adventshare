const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Housing Model
const Area = mongoose.model('Area', new Schema({
  name: String,
  description: String,
  img: Array,
  activity: [{type: Schema.Types.ObjectId, ref: 'Activity'}]
  // rating: Number,
  // reviews: { type: Schema.Types.ObjectId, ref: 'Review' },
}));

module.exports = Area