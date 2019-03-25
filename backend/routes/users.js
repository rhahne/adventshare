var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const User = require('../models/user.js')

// Sign up post request
router.post('/', (req, res, next) => {
  // Frontend Validation
  const {
    firstname,
    email,
    bio,
    password
  } = req.body;
  if (!firstname || !email || !bio || !password) {
    res.status(400).json({
      message: 'Please fill in all the fields, son!'
    })
  } else if (firstname.length <= 1) {
    res.status(400).json({
      message: 'A firstname with one character? cmon son!'
    })
  } else if (password.length < 5) {
    res.status(400).json({
      message: 'Password has to be at least 5 characters long!'
    })
  } else {
    // Backend Validation
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      User.create({
          firstname: req.body.firstname,
          email: req.body.email,
          bio: req.body.bio,
          password: hash,
        })
        .then(() => {
          res.status(200).json()
        })
        .catch(err => {
          res.status(400).json({
            message: 'User could not be created!'
          })
        })
    })
  }
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

// Sign up post request
router.post('/', (req, res, next) => {
  // Frontend Validation
  const {
    firstname,
    email,
    bio,
    password
  } = req.body;
  if (!firstname || !email || !bio || !password) {
    res.status(400).json({
      message: 'Please fill in all the fields, son!'
    })
  } else if (firstname.length <= 1) {
    res.status(400).json({
      message: 'A firstname with one character? cmon son!'
    })
  } else if (password.length < 5) {
    res.status(400).json({
      message: 'Password has to be at least 5 characters long!'
    })
  } else {
    // Backend Validation
    bcrypt.hash(password, 10, function (err, hash) {
      User.create({
          firstname: firstname,
          email: email,
          bio: bio,
          password: hash,
        })
        .then(newUser => {
          req.session.user = newUser._doc;
          req.session.userId = newUser._doc._id;
          req.session.save();
          res.status(200).json({
            message: 'success!'
          })
        })
        .catch(err => {
          res.status(400).json({
            message: 'User could not be created!'
          })
        })
    })
  }
});

// Login post request
router.post('/login', (req, res, next) => {
  // Frontend Validation
  const {
    firstname,
    password
  } = req.body;
  if (!firstname || !password) {
    res.status(400).json({
      message: 'Please fill in all the fields, son!'
    })
  } else {
    // Backend Validation
    User.findOne({
        firstname: req.body.firstname
      })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(400).json({
            message: 'User does not exist, son!'
          })
        } else {
          bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if (result == true) {
              req.session.user = foundUser._doc;
              req.session.userId = foundUser._doc._id;
              req.session.save();
              res.status(200).json({
                message: 'success!'
              })
            } else {
              res.status(400).json({
                message: 'Password is not correct, son!'
              })
            }
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: 'Something went wrong!'
        })
      })
  }
});

// Logout post request
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
})

// get logged in user in json
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(403).json({
      message: 'unauthorized'
    })
  }
})

// get logged in user in json
router.get('/account', (req, res) => {
  if (req.session.user) {
    User.findOne({
      _id: req.session.userId
    })
    .populate({
      path: 'bookings', 
      model: 'Booking',
      populate: {
        path: 'housing',
        model: 'Housing'
      }})
    .then(currentUser => {
      res.json(currentUser)
    })
  } else {
    res.status(403).json({
      message: 'unauthorized'
    })
  }
})

module.exports = router;