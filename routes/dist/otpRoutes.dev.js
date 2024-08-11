"use strict";

var express = require('express');

var _require = require('../controllers/otpController'),
    sendOTP = _require.sendOTP,
    verifyOTP = _require.verifyOTP;

var router = express.Router();
router.get('/sendOTP', sendOTP);
router.get('/verifyOTP', verifyOTP);
module.exports = router;