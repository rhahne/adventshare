var express = require('express');
var router = express.Router();

const Housing = require('../models/housing.js')

/*
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
*/
// Detail page for housing
router.get('/:housingId', (req, res) => {
  Housing.findOne({
    _id:req.params.housingId}
    )
    .then(foundHousing => {
      res.json(foundHousing);
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;