"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var noteSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Note", noteSchema);
exports["default"] = _default;