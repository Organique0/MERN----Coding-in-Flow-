"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiresAuth = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var requiresAuth = function requiresAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    next((0, _httpErrors["default"])(401, "user not authenticated"));
  }
};
exports.requiresAuth = requiresAuth;