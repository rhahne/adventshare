const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Housing Model
const Housing = mongoose.model('Housing', new Schema({
  title: String,
  description: String,
  img: Array,
  address: Object,
  // host: String,
<<<<<<< HEAD
  area: Array,
=======
  area: [{ type: Schema.Types.ObjectId, ref: 'Area' }],
>>>>>>> e2238d0e27ede3724cd101006ee77995b8390185
  pricing: Number,
  // rating: Number,
  // reviews: { type: Schema.Types.ObjectId, ref: 'Review' },
  beds: Number
}));

module.exports = Housing