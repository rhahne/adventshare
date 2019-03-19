var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js')

// POST route => to create a new user
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    User.create({
        firstname: req.body.firstname,
        email: req.body.email,
        bio: req.body.bio,
        password: hash,
      })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
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
  User.findOne({
      firstname: req.body.firstname
    })
    .then((foundUser) => {
      if (!foundUser) {
        res.send('duuude')
        console.log('user does not exist, son')
      } else {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
          if (result == true) {
            debugger
            req.session.user = foundUser._doc;
            req.session.save();
            res.send(foundUser._doc)
          } else {
            res.send(false)
            console.log('error, son')
          }
        });
      }
    })
    .catch((err) => {
      res.send('dadadada');
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