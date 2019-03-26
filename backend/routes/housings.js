var express = require('express');
var router = express.Router();

const Housing = require('../models/housing.js')
const Area = require('../models/area.js')
const Activity = require('../models/activity.js')
const Booking = require('../models/booking.js')
const User = require('../models/user.js')

// Get all houses
router.get('/', (req, res, next) => {
  Housing
    .find({})
    .populate({
      path: 'area', 
      model: 'Area',
      populate: {
        path: 'activity',
        model: 'Activity'
      }})
      .then((response) => {
        res.status(200).json(response)
      })
      .catch(error => {
          res.status(400).json(error)
      })
})

router.get('/booking', (req, res) => {
  let housing = req.query.housing
  let date = parseInt(req.query.date)
  Booking.findOne({
    housing: housing,
    date: date
  })
  .then(foundBooking => {
    res.json(foundBooking);
  })
  .catch(err => {
    res.json(err);
  })
})

// Show Interest Button
router.get('/showInterest', (req, res) => {
  let date = req.query.date;
  let housingId = req.query.housingId
  let spots = req.query.beds
  Booking.findOneAndUpdate({
    housing: housingId,
    date: date
  },{ $push: { users: req.session.user } }, {new:true},
  (err, result)=>{
    if (result){
      if(result.users.length === result.spots){
        Booking.findOneAndUpdate({
          housing: housingId,
          date: date
        },{ full: true }).exec()
      }
      User.findOneAndUpdate({
        _id: req.session.userId
      },{ $push: { bookings: result } },{new:true})
      .exec()
      res.json(result);
    } else{
      Booking.create({
        housing: housingId,
        users: [req.session.user],
        spots: spots,
        date: date,
        booked: false
      })
      .then((newBooking) => {
        User.findOneAndUpdate({
          _id: req.session.userId
        },{ $push: { bookings: newBooking } },{new:true})
        .exec()
        res.json(newBooking);
      })
    }
  })
})

// Delete Interest Button
router.get('/deleteInterest', (req, res) => {
  Booking.findOneAndUpdate({
    housing: req.query.housingId,
    date: parseInt(req.query.date)
  }, {$pull: { users: req.session.userId }},{new:true})
  .then(updatedBooking => {
    User.findOneAndUpdate({
      _id: req.session.userId
    },{ $pull: { bookings: updatedBooking._id } })
    .exec()
    res.json(updatedBooking);
  })
  .catch(err => {
    res.json(err);
  })
})

// Detail page for housing
router.get('/:housingId', (req, res) => {
  Housing.findOne({
    _id:req.params.housingId}
    )
    .populate({
      path: 'area',
      model: 'Area',
      populate: {
        path: 'activity',
        model: 'Activity'
      }})
    .then(foundHousing => {
      res.json(foundHousing);
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;
