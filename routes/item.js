const express = require('express')
const router = express.Router()
const {createItem} = require('../controllers/item')






router.route('/').post(createItem)
module.exports = router;