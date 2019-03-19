var express = require('express');
var router = express.Router();

const User = require('../models/user.js')

// POST route => to create a new user
router.post('/', (req, res, next) => {
    User.create({
        firstname: req.body.firstname,
        email: req.body.email,
        bio: req.body.bio,
        password: req.body.password,
      })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
});

// GET route => to get all the projects
router.get('/', (req, res, next) => {
  User.find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;