const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Model
const User = mongoose.model('User', new Schema({
  firstname: String,
  email: String,
  bio: String,
  password: String
}));

module.exports = User