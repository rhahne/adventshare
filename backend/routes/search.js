var express = require('express');
var router = express.Router();
const Housing = require('../models/housing')

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
    debugger
    // Backend Validation
        Housing.find({
            'area': where
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Housing not found'
                })
            })
        }
});

router.get('/query', (req, res, next) => {
    res.status(200).json({message: "success"})
})

module.exports = router;