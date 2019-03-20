const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Housing Model
const Housing = mongoose.model('User', new Schema({
  title: String,
  description: String,
  img: Array,
  address: Object,
  host: String,
  area: { type: Schema.Types.ObjectId, ref: 'Area' },
  pricing: Number,
  rating: Number,
  reviews: { type: Schema.Types.ObjectId, ref: 'Review' },
  beds: Number
}));

module.exports = Housing