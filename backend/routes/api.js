var express = require('express');
var router = express.Router();

const User = require('../models/user.js')

// Routing for API requests
router.get("/demo", (req, res) => {
  const demoOne = [
      {title: 'history', name: 'sÚon'},
      {title: 'stroopwafels', name: 'sÚon'}
  ]
  res.json(demoOne)
});

router.get('/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
  res.json(customers);
})

module.exports = router;