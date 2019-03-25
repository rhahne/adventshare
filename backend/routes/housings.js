var express = require('express');
var router = express.Router();

const Housing = require('../models/housing.js')
const Area = require('../models/area.js')
const Activity = require('../models/activity.js')

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
