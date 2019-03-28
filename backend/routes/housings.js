var express = require('express');
var moment = require('moment')
var router = express.Router();
const mongoose = require('mongoose')

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


// Get Houses in certain AREA IDw
router.get('/inarea', (req, res, next) => {
  Housing.find({
    $and: [
      {area: req.query.areaId},
      { _id: { $nin: [req.query.houseId] } }
    ]
  })
  .populate({
    path: 'area', 
    model: 'Area',
    populate: {
      path: 'activity',
      model: 'Activity'
    }})
    .then((foundHousesInArea) => {
        res.status(200).json(foundHousesInArea)
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

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
    );
  }
  return days;
}
function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
      .toDate(),
  };
}

router.get('/calendarInfo', (req, res) => {
  Booking.find({
    housing: req.query.housing,
  })
  .then(foundBookings => {
    let bookedDays = [];
    let interestedDays = [];
    let myDays = [];
    foundBookings.forEach(booking => {
      if(booking.users.indexOf(req.session.userId) > -1){
        let firstDayOfWeek = moment().day("Sunday").week(booking.date);
        let allDays = getWeekDays(firstDayOfWeek)
        allDays.forEach(day =>{
          myDays.push(String(day._d))
        })
      }
      if(booking.booked || booking.full){
        let firstDayOfWeek = moment().day("Sunday").week(booking.date);
        let allDays = getWeekDays(firstDayOfWeek)
        allDays.forEach(day =>{
          bookedDays.push(String(day._d))
        })
      }
      else if(booking.users.length > 0){
        let firstDayOfWeek = moment().day("Sunday").week(booking.date);
        let allDays = getWeekDays(firstDayOfWeek)
        allDays.forEach(day =>{
          interestedDays.push(String(day._d))
        })
      }
    })
    res.json({myDays, bookedDays, interestedDays});
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
        Housing.findOneAndUpdate({
          _id:housingId
        }, {$push: {bookings: newBooking}}, {new: true})
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
    _id: req.params.housingId }
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

// Show Interest Button
router.get('/:housingId/interest', (req, res) => {
  Housing.findOneAndUpdate({_id:req.params.housingId},{ $push: { interests: req.session.userId } },{new:true}
    )
    .populate('area')
    .then(foundHousing => {
      res.json(foundHousing);
    })
    .catch(err => {
      res.json(err);
    })
})

// Delete Interest Button
router.get('/:housingId/deleteInterest', (req, res) => {
  Housing.findOneAndUpdate({_id:req.params.housingId},{ $pull: { interests: req.session.userId } },{new:true}
    )
    .populate('area')
    .then(foundHousing => {
      res.json(foundHousing);
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;
