"use strict";

var mongoose = require("mongoose");

var couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Coupon name is required"],
    trim: true
  },
  expire: {
    type: Date,
    required: [true, "Coupon expire date is required"]
  },
  discount: {
    type: Number,
    required: [true, "Coupon discount is required"]
  }
}, {
  timestamps: true
});
var Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;