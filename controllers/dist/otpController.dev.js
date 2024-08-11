"use strict";

var Otps = require("../models/otpModel.js");

var randomstring = require("randomstring");

var sendEmail = require("../utils/sendEmails"); // Generate OTP


function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric"
  });
} // Send OTP to the provided email


exports.sendOTP = function _callee(req, res, next, successMessage) {
  var email, otp, newOTP;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          console.log(email);
          otp = generateOTP(); // Generate a 6-digit OTP

          newOTP = new Otps({
            email: email,
            otp: otp
          });
          console.log(newOTP);
          _context.next = 8;
          return regeneratorRuntime.awrap(newOTP.save());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(sendEmail({
            to: email,
            subject: "Your OTP",
            message: "<p>Your OTP is: <strong>".concat(otp, "</strong></p>")
          }));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error sending OTP:", _context.t0);
          res.status(500).json({
            success: false,
            error: "Internal server error 3"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // Verify OTP provided by the user


exports.verifyOTP = function _callee2(req, res, next) {
  var _req$query, email, otp, existingOTP;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, email = _req$query.email, otp = _req$query.otp;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Otps.findOneAndDelete({
            email: email,
            otp: otp
          }));

        case 4:
          existingOTP = _context2.sent;

          if (existingOTP) {
            // OTP is valid
            res.status(200).json({
              success: true,
              message: "OTP verification successful"
            });
          } else {
            // OTP is invalid
            res.status(400).json({
              success: false,
              error: "Invalid OTP"
            });
          }

          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error verifying OTP:", _context2.t0);
          res.status(500).json({
            success: false,
            error: "Internal server error"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};