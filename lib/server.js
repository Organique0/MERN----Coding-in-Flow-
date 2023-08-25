"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var app_1 = __importDefault(require("./app"));
var validateEnv_1 = __importDefault(require("./util/validateEnv"));
var mongoose_1 = __importDefault(require("mongoose"));
var port = validateEnv_1["default"].PORT;
mongoose_1["default"].connect(validateEnv_1["default"].MONGO_CONNECTION_STRING).then(function () {
  console.log("Mongoose Connected");
  app_1["default"].listen(port, function () {
    console.log("listening on port: " + port);
  });
})["catch"](console.error);