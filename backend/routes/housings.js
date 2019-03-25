var express = require('express');
var router = express.Router();

const Housing = require('../models/housing.js')
const Area = require('../models/area.js')
const Activity = require('../models/activity.js')
const Booking = require('../models/booking.js')

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

  Booking.findOneAndUpdate({
    housing: housingId,
    date: date
  },{ $push: { users: req.session.user } }, {new:true},
  (err, result)=>{
    if (result){
      res.json(result);
    } else{
      Booking.create({
        housing: housingId,
        users: [req.session.user],
        spots: 4,
        date: date,
        booked: false
      })
      .then((newBooking) => {
        res.json(newBooking);
      })
    }
  })
})

// Delete Interest Button
router.get('/deleteInterest', (req, res) => {
  debugger
  Booking.findOneAndUpdate({
    housing: req.query.housingId,
    date: parseInt(req.query.date)
  }, {$pull: { users: req.session.userId }},{new:true})
  .then(updatedBooking => {
    debugger
    res.json(updatedBooking);
  })
  .catch(err => {
    debugger
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
/*
// get BookingData for frontend detail site
router.get('/booking', (req, res) => {
  debugger

  /*
  Booking.findOne({
    housing: housingId,
    date: date
  })
  .then(foundBooking => {
    debugger
    res.json(foundBooking);
  })
  .catch(err => {
    debugger
    res.json(err);
  })
})
*/
module.exports = router;
