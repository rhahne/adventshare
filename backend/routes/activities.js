var express = require('express');
var router = express.Router();

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
  
  router.get('/details/:activityId', (req, res) => {
    Area.find({
      activity: req.params.activityId}
      )
      .populate('activity')
      .then(areasWithActivity => {
        debugger
        Housing.find(

          // BREAK THIS CODE
          // {areasWithActivity.map(area => {
          //   return { area: { "$in": areaWithActivity.activity}}
          // })}
         
          ).then(housingsInArea => {
          res.json({area, housingsInArea});
        })
      })
      .catch(err => {
        res.json(err);
      })
  })

  module.exports = router;