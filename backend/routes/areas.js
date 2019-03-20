var express = require('express');
var router = express.Router();

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

module.exports = router;