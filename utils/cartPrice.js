const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  for(let item in cart.items) {
    totalPrice += cart.items[item].price * cart.items[item].quantity
  }
  cart.totalPriceAfterDiscount = undefined;
  cart.totalPrice = totalPrice;
};

module.exports = calcTotalCartPrice;