var express = require('express');
var router = express.Router();
const {createUser, loginUser} = require('../controllers/users.js')

/* GET users listing. */
router.route('/').post(createUser)
router.route('/login').post(loginUser)

module.exports = router;
