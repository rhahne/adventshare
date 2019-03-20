var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const User = require('../models/user.js')

// Sign up post request
router.post('/', (req, res, next) => {
  debugger
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
  }
  if (firstname.length <= 1) {
    res.status(400).json({
      message: 'A firstname with one character? cmon son!'
    })
  }
  if (password.length < 5) {
    res.status(400).json({
      message: 'Password has to be at least 5 characters long!'
    })
  }

  // Backend Validation
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    User.create({
        firstname: req.body.firstname,
        email: req.body.email,
        bio: req.body.bio,
        password: hash,
      })
      .then(response => {
        //res.json(response);
        res.status(200).json()
      })
      .catch(err => {
        //res.json(err);
        res.status(400).json({
          message: 'User could not be created!'
        })
      })
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

// POST route => check login information
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
  }

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
            debugger
            req.session.user = foundUser._doc;
            req.session.save();
            res.status(200).json({
              message: 'success!'
            })
            //jres.send(foundUser._doc)
          } else {
            res.status(400).json({
              message: 'Password is not correct, son!'
            })
            //res.send(false)
          }
        });
      }
    })
    .catch((err) => {
      res.send(false);
      console.log(err)
    })
});

router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(403).json({
      message: 'unauthorized'
    })
  }
})

// Click on Logout Button
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
})

module.exports = router;