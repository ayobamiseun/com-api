var express = require('express');
var router = express.Router();
const User = require('../models/users.js')

/* GET users listing. */
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({user, token})
  } catch (error) {
      res.status(400).send(error)
  }
  })

module.exports = router;
