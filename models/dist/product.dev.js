"use strict";

var mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "product id is required"]
    },
    quantity: {
      type: Number,
      "default": 1
    },
    color: String,
    size: String,
    price: Number
  }],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User id is required"]
  }
}, {
  timestamps: true
}); // hook to populate product on find

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "items.product",
    select: 'title cover ratingsAverage'
  }), next();
});
var Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;