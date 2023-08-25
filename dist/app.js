"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _notes = _interopRequireDefault(require("./routes/notes"));
var _users = _interopRequireDefault(require("./routes/users"));
var _morgan = _interopRequireDefault(require("morgan"));
var _httpErrors = _interopRequireWildcard(require("http-errors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _validateEnv = _interopRequireDefault(require("./util/validateEnv"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _auth = require("./middleware/auth");
var _cors = _interopRequireDefault(require("cors"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
var corsOptions = {
  origin: "https://mern-notes-app-rouge.vercel.app",
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
app.use(
  (0, _expressSession["default"])({
    secret: _validateEnv["default"].SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000
    },
    rolling: true,
    proxy: true,
    store: _connectMongo["default"].create({
      mongoUrl: _validateEnv["default"].MONGO_CONNECTION_STRING
    })
  })
);
app.use("/api/users", _users["default"]);
app.use("/api/notes", _auth.requiresAuth, _notes["default"]);
app.use("/", function (req, res) {
  res.json("hello world");
});
app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error, req, res, next) {
  console.error(error);
  var errorMessage = "An error occurred";
  var statusCode = 500;
  if ((0, _httpErrors.isHttpError)(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({
    error: errorMessage
  });
});
var _default = app;
exports["default"] = _default;
