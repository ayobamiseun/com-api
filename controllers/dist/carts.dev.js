"use strict";

var asyncHandler = require("express-async-handler");

var _require = require("http-status-codes"),
    StatusCodes = _require.StatusCodes;

var _require2 = require("../utils/cartPrice"),
    calcTotalCartPrice = _require2.calcTotalCartPrice;

var ApiError = require("../../shared/utils/api-error");

var Product = require("../models/products");

var Coupon = require("../models/coupons");

var Cart = require("../models/carts"); // @desc   Add product to cart
// @route  POST /api/v1/cart
// @access Privet (USer)


exports.addProductToCartHandler = asyncHandler(function _callee(req, res) {
  var _req$body, productId, color, size, product, cart, productIndex, item;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, productId = _req$body.productId, color = _req$body.color, size = _req$body.size;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: req.user._id
          }));

        case 6:
          cart = _context.sent;

          if (cart) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(Cart.create({
            user: req.user._id,
            items: [{
              product: product,
              color: color,
              price: product.price
            }]
          }));

        case 10:
          cart = _context.sent;
          _context.next = 15;
          break;

        case 13:
          productIndex = cart.items.findIndex(function (item) {
            return item.product.toString() === productId && item.color === color && item.size === size;
          });

          if (productIndex > -1) {
            item = cart.items[productIndex];
            item.quantity += 1;
            cart.items[productIndex] = item;
          } else {
            cart.items.push({
              product: product,
              color: color,
              size: size,
              price: product.price
            });
          }

        case 15:
          calcTotalCartPrice(cart);
          _context.next = 18;
          return regeneratorRuntime.awrap(cart.save());

        case 18:
          return _context.abrupt("return", res.status(StatusCodes.OK).json({
            status: "success",
            message: "product has been added successfully to your cart",
            items: cart.items.length,
            data: cart
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Privet (User)

exports.getLoggedUserCartHandler = asyncHandler(function _callee2(req, res, next) {
  var cart;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: req.user._id
          }));

        case 2:
          cart = _context2.sent;

          if (cart) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ApiError("No cart found for this user", StatusCodes.NOT_FOUND)));

        case 5:
          return _context2.abrupt("return", res.status(StatusCodes.OK).json({
            status: "success",
            items: cart.items.length,
            data: cart
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    Update specific item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private (User)

exports.updateSpecificItemQuantityHandler = asyncHandler(function _callee3(req, res, next) {
  var itemId, quantity, cart, itemIndex, item;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          itemId = req.params.itemId;
          quantity = req.body.quantity;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: req.user._id
          }));

        case 4:
          cart = _context3.sent;

          if (cart) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(new ApiError("No cart for this user", StatusCodes.NOT_FOUND)));

        case 7:
          itemIndex = cart.items.findIndex(function (item) {
            return item._id.toString() === itemId;
          });

          if (!(itemIndex > -1)) {
            _context3.next = 14;
            break;
          }

          item = cart.items[itemIndex];
          item.quantity = quantity;
          cart.items[itemIndex] = item;
          _context3.next = 15;
          break;

        case 14:
          return _context3.abrupt("return", next(new ApiError("No item found", StatusCodes.NOT_FOUND)));

        case 15:
          calcTotalCartPrice(cart);
          _context3.next = 18;
          return regeneratorRuntime.awrap(cart.save());

        case 18:
          res.status(StatusCodes.OK).json({
            status: "success",
            message: "Item quantity updated successfully",
            items: cart.items.length,
            data: cart
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:itemId
// @access  Privet (User)

exports.removeItemFromCartHandler = asyncHandler(function _callee4(req, res, next) {
  var itemId, cart;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          itemId = req.params.itemId;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Cart.findOneAndUpdate({
            user: req.user._id
          }, {
            $pull: {
              items: {
                _id: itemId
              }
            }
          }, {
            "new": true
          }));

        case 3:
          cart = _context4.sent;

          if (cart) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next(new ApiError("Error while removing item from your cart", StatusCodes.NOT_MODIFIED)));

        case 6:
          calcTotalCartPrice(cart);
          _context4.next = 9;
          return regeneratorRuntime.awrap(cart.save());

        case 9:
          return _context4.abrupt("return", res.status(StatusCodes.OK).json({
            status: "success",
            items: cart.items.length,
            message: "Item removed successfully from your cart",
            data: cart
          }));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    Clear logged user cart
// @route   DElETE /api/v1/cart
// @access  Privet (User)

exports.clearLoggedUserCartHandler = asyncHandler(function _callee5(req, res, next) {
  var cart;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Cart.findOneAndDelete({
            user: req.user._id
          }));

        case 2:
          cart = _context5.sent;

          if (cart) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ApiError("No cart found for this user", StatusCodes.NOT_FOUND)));

        case 5:
          return _context5.abrupt("return", res.status(StatusCodes.NO_CONTENT).send());

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // @desc    Apply coupon to cart
// @route   POST /api/v1/cart/applyCoupon
// @access  Privet (User)

exports.applyCouponHandler = asyncHandler(function _callee6(req, res, next) {
  var coupon, cart, totalPriceAfterDiscount;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Coupon.findOne({
            name: req.body.coupon,
            expire: {
              $gt: Date.now()
            }
          }));

        case 2:
          coupon = _context6.sent;

          if (coupon) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new ApiError("Invalid or expired coupon", StatusCodes.BAD_REQUEST)));

        case 5:
          _context6.next = 7;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: req.user._id
          }));

        case 7:
          cart = _context6.sent;
          totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount / 100).toFixed(2);
          cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
          _context6.next = 12;
          return regeneratorRuntime.awrap(cart.save());

        case 12:
          res.status(StatusCodes.OK).json({
            status: "success",
            message: "Coupon has been applied successfully to your cart",
            items: cart.items.length,
            data: cart
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
});