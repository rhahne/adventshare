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
    if (enddate <= startdate) {
        res.status(400).json({
            message: 'A your end date should be later than your start date sön'
        })
    }
    if (password.length < 5) {
        res.status(400).json({
            message: 'Password has to be at least 5 characters long!'
        })
    }

    // Backend Validation
        Housing.find({
            area: where
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                //res.json(err);
                res.status(400).json({
                    message: 'User could not be created!'
                })
            })
});

router.get('/query', (req, res, next) => {
    res.status(200).json({message: "success"})
})


module.exports = router;