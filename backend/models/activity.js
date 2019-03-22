const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Activity Model
const Activity = mongoose.model('Activity', new Schema({
  name: String,
  description: String,
  img: Array,
}));

module.exports = Activity