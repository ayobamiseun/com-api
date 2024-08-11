"use strict";

var calcTotalCartPrice = function calcTotalCartPrice(cart) {
  var totalPrice = 0;

  for (var item in cart.items) {
    totalPrice += cart.items[item].price * cart.items[item].quantity;
  }

  cart.totalPriceAfterDiscount = undefined;
  cart.totalPrice = totalPrice;
};

module.exports = calcTotalCartPrice;