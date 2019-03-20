const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Housing Model
const Area = mongoose.model('User', new Schema({
  img: Array,
  housing: { type: Schema.Types.ObjectId, ref: 'Housing' },
  activities: Array,
  rating: Number,
  reviews: { type: Schema.Types.ObjectId, ref: 'Review' },
}));

module.exports = Area