const express = require('express')
const router = express.Router()
const {createItem,getItem,filterItems} = require('../controllers/item')









router.route('/').post(createItem).get(filterItems)
router.route('/static').get(getItem)
module.exports = router;