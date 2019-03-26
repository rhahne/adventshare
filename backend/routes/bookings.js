var express = require('express');
var router = express.Router();
const Booking = require('../models/booking.js')

router.get('/confirm', (req, res, next) => {
  const { bookingId, isConfirmed } = req.query;
  if (isConfirmed === true) {
    Booking.findOneAndUpdate({
      _id: bookingId,
    }, { $push: { confirmation: req.session.user } })
      .exec()
  } else {
    debugger
    Booking.findOneAndUpdate({
      _id: bookingId,
    }, {
        $set: {
          full: false
        }, $pull: { 
          users: req.session.userId
        }
      }
      , { new: true })
      .then(newBooking => {
        debugger
      })
      .catch(err => {
        debugger
      })
  }
});

module.exports = router;