const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Booking Model
const Booking = mongoose.model('Booking', new Schema({
  housing: { type: Schema.Types.ObjectId, ref: 'Housing' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  spots: Number,
  date: Number,
  booked: Boolean
}));

module.exports = Booking