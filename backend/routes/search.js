var express = require('express');
var router = express.Router();
const Housing = require('../models/housing');
const Area = require('../models/area');

router.post('/', (req, res, next) => {
    // Frontend Validation

    const { where, activity, startdate, enddate } = req.body;

    if (!where || !activity || !startdate || !enddate) {
        res.status(400).json({
            message: 'Please fill in all the fields, son!'
        })
    }
    else if (enddate <= startdate) {
        res.status(400).json({
            message: 'A your end date should be later than your start date sön'
        })
    }
    else {
        Housing
            .find({})
            .then((response) => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(400).json(error)
            })
        }
});

router.get('/query', (req, res, next) => {
    res.status(200).json({message: "success"})
})

module.exports = router;