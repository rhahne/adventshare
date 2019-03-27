var express = require('express');
var router = express.Router();

const Activity = require('../models/activity.js')
const Housing = require('../models/housing.js')
const Area = require('../models/area.js')


// GET route => to get all the projects
router.get('/', (req, res, next) => {
  Area.find()
    .then(allAreas => {
      res.json(allAreas);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/details/:areaId', (req, res) => {
  Area.findOne({
    _id:req.params.areaId}
    )
    .then(area => {
      Housing.find({
        area: req.params.areaId
      }).then(housingsInArea => {
        res.json({area, housingsInArea});
      })
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;