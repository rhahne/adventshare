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
  
  module.exports = router;