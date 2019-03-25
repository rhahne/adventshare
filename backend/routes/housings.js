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
  let date = req.query.date
  debugger
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

// Show Interest Button
router.get('/:housingId/interest', (req, res) => {
  debugger
  let date = req.query.date;
  let housingId = req.params.housingId

  Booking.findOneAndUpdate({
    housing: housingId,
    date: date
  },{ $push: { users: req.session.userId } }, {new:true},
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
/*
  Housing.findOne({
    _id: housingId
  })
  .then((theHousing) => {
    theHousing

    Booking.findOne({
      housing: theHousing._id,
      time: 1
    },(foundBooking)=>{
      if (foundBooking){
        // add user to foundbooking
      } else{
        // create Booking and add user
        Booking.create({
          Housing: theHousing._id,
        })
      }
    })
  })
  .catch((err) => {
    res.send(err)
  })

  

  User.create({
    firstname: firstname,
    email: email,
    bio: bio,
    password: hash,
  })
  .then(newUser => {
    req.session.user = newUser._doc;
    req.session.userId = newUser._doc._id;
    req.session.save();
    res.status(200).json({
      message: 'success!'
    })
  })
  .catch(err => {
    res.status(400).json({
      message: 'User could not be created!'
    })
  })

  Housing.findOneAndUpdate({_id:req.params.housingId},{ $push: { interests: req.session.userId } },{new:true}
    )
    .populate('area')
    .then(foundHousing => {
      res.json(foundHousing);
    })
    .catch(err => {
      res.json(err);
    })
    */
})

// Delete Interest Button
router.get('/:housingId/deleteInterest', (req, res) => {
  debugger 
  Housing.findOneAndUpdate({_id:req.params.housingId},{ $pull: { interests: req.session.userId } },{new:true}
    )
    .populate('area')
    .then(foundHousing => {
      debugger
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
