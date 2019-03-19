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
  /*
  const { username, password } = req.body;
  if(!username || !password){
    res.status(400).json({message:'Please fill in all the fields, son!'})
  }
  */
  User.findOne({
      firstname: req.body.firstname
    })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({message:'User does not exist, son!'})
      } else {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
          if (result == true) {
            debugger  
            req.session.user = foundUser._doc;
            req.session.save();
            res.status(200).json({message:'success!'})
            //jres.send(foundUser._doc)
          } else {
            res.status(400).json({message:'Password is not correct, son!'})
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