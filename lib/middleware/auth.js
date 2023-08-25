"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiresAuth = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var requiresAuth = function requiresAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    next((0, http_errors_1["default"])(401, "user not authenticated"));
  }
};
exports.requiresAuth = requiresAuth;