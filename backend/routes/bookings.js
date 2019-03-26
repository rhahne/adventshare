var express = require('express');
var router = express.Router();
const Booking = require('../models/booking.js')
const User = require('../models/user.js')

router.get('/confirm', (req, res, next) => {
  const { bookingId, isConfirmed } = req.query;
  if (isConfirmed === 'true') {
    Booking.findOneAndUpdate({
      _id: bookingId,
    }, { $push: { confirmation: req.session.user } }, {new:true})
      .then(newBooking => {
        if(newBooking.confirmation.length === newBooking.spots){
          Booking.findOneAndUpdate({
          _id: bookingId,
        }, { booked: true }).exec()
        }
      })
  } else {
    Booking.findOneAndUpdate({
      _id: bookingId,
    }, {
        $set: {
          full: false,
          confirmation: []
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
    User.findOneAndUpdate({
      _id: req.session.userId
    }, { $pull: { bookings: bookingId } }, { new: true }).
      then(foundUse => {
        debugger
      }).catch(err => {
        debugger
      })
  }
});

module.exports = router;