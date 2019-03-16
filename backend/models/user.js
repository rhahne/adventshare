const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Model
const User = mongoose.model('User', new Schema({
  firstName: String,
  eMail: String,
  bio: String,
  password: String
}));

module.exports = User