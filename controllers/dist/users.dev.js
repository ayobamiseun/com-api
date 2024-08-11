"use strict";

var User = require("../models/users");

var _require = require("./otpController"),
    sendOTP = _require.sendOTP;

var _require2 = require('../utils/getUserInfo'),
    getUserInfo = _require2.getUserInfo;

var createUser = function createUser(req, res) {
  var user, token, customSuccessMessage;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context.sent;
          console.log(token);
          customSuccessMessage = "Account Created Successfully";
          _context.next = 11;
          return regeneratorRuntime.awrap(sendOTP(req, res, customSuccessMessage));

        case 11:
          res.status(201).send(user);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0.message);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

var loginUser = function loginUser(req, res) {
  var cookie, user, token;
  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cookie = req.cookies;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 7:
          token = _context2.sent;
          res.send({
            user: user,
            token: token,
            cookie: cookie
          });
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

module.exports = {
  createUser: createUser,
  loginUser: loginUser
};