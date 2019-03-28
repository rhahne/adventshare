var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Housing = require('../models/housing.js')
const Area = require('../models/area.js')
const Activity = require('../models/activity.js')

router.get('/', (req, res, next) => {
  Activity
    .find({})
    .then(activityArray => {
      res.json(activityArray);
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/details/housing/:activityId', (req, res) => {
  Area.find({
      activity: req.params.activityId
    })
    .populate('activity')
    .then(areasWithActivity => {
      let areaIDs = []
      areasWithActivity.forEach(area => {
        let id = area.id
        areaIDs.push(id)
      })
      Housing
      .find({
        area: { $in: areaIDs}
      })
      .then(response => {
        res.json(response);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/details/activity/:activityId', (req, res) => {
  Activity.find({
      _id: req.params.activityId
    })
    .then(activity => {
        res.json(activity);
    })
    .catch(err => {
      res.json(err);
    })
})

router.get('/details/area/:activityId', (req, res) => {
  Area.find({
      activity: req.params.activityId
    })
    .populate('activity')
    .then(areasWithActivity => {
        res.json(areasWithActivity);
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;