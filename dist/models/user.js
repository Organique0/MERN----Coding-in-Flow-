"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
var _default = (0, _mongoose.model)("user", userSchema);
exports["default"] = _default;