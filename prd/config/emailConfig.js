"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
let transporter = _nodemailer.default.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    // Admin Gmail ID
    pass: process.env.EMAIL_PASS // Admin Gmail Password
  }
});
var _default = transporter;
exports.default = _default;