const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Model
const User = mongoose.model('User', new Schema({
  firstname: String,
  email: String,
  bio: String,
  password: String,
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
}));

module.exports = User