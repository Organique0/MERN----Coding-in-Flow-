"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var notes_1 = __importDefault(require("./routes/notes"));
var users_1 = __importDefault(require("./routes/users"));
var morgan_1 = __importDefault(require("morgan"));
var http_errors_1 = __importStar(require("http-errors"));
var express_session_1 = __importDefault(require("express-session"));
var validateEnv_1 = __importDefault(require("./util/validateEnv"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var auth_1 = require("./middleware/auth");
var app = (0, express_1["default"])();
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use((0, express_session_1["default"])({
  secret: validateEnv_1["default"].SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  rolling: true,
  store: connect_mongo_1["default"].create({
    mongoUrl: validateEnv_1["default"].MONGO_CONNECTION_STRING
  })
}));
app.use("/api/users", users_1["default"]);
app.use("/api/notes", auth_1.requiresAuth, notes_1["default"]);
app.use("/", function (req, res) {
  res.json("hello world");
});
app.use(function (req, res, next) {
  next((0, http_errors_1["default"])(404, "Endpoint not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error, req, res, next) {
  console.error(error);
  var errorMessage = "An error occurred";
  var statusCode = 500;
  if ((0, http_errors_1.isHttpError)(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({
    error: errorMessage
  });
});
exports["default"] = app;