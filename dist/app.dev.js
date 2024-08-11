"use strict";

var createError = require("http-errors");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var itemsRouter = require("./routes/item");

var otpRoutes = require("./routes/otpRoutes");

require("dotenv").config();

var https = require("https");

var http = require("http");

var notFoundMiddleware = require("./middleware/not-found");

var errorHandlerMiddleware = require("./middleware/error-handler");

var connectDB = require("./db/connect");

var cors = require("cors");

var app = express(); //cors 

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
var port = process.env.port || 3000; // view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.disable("x-powered-by");
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/items", itemsRouter);
app.use('/api/v1', otpRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

var start = function start() {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGO_URL));

        case 3:
          app.listen(port, console.log("app running fine on ".concat(port)));
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

start();
module.exports = app;