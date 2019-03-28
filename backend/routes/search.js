var express = require('express');
var router = express.Router();
const Housing = require('../models/housing')
const Area = require('../models/area')

router.get('/', (req, res, next) => {
    Housing.find()
    .then(allHousing => {
      res.json(allHousing);
    })
    .catch(err => {
      res.json(err);
    })
});

function getNumberOfWeek(dateIn) {
    const date = new Date(dateIn);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

router.post('/', function (req, res, next) {
    debugger
        const { where, activity, from, to } = req.body;
        const weekNumStart = getNumberOfWeek(from)
        const weekNumEnd = getNumberOfWeek(to)

    if (!where || !activity ) {
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
        .find({area: where})
        .populate({
            path: 'area', 
            model: 'Area',
            populate: {
                path: 'activity',
                model: 'Activity'
            }})
        .populate({
            path: 'bookings',
            match: {
                $and: [ 
                    { date: { $gt: weekNumStart } }, 
                    { date: { $lt: weekNumEnd } }, 
                    { booked: { $nin: [false] } 
                } ] },
            })
        .then(allHouses => {
            res.status(200).json(allHouses)
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