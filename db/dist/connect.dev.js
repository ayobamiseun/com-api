"use strict";

var mongoose = require('mongoose');

mongoose.set("strictQuery", false);

var connectDB = function connectDB(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectDB;