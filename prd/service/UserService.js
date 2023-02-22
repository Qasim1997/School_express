"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const User = require("../models").User;
class UserService {}
exports.default = UserService;
_defineProperty(UserService, "register", async data => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmed_password,
    type,
    studentId,
    teacherId
  } = data;
  // this.firstBrother = name;
  const salt = await _bcrypt.default.genSalt(10);
  const hashPassword = await _bcrypt.default.hash(password, salt);
  console.log(data, "body");
  const doc = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
    type: type,
    studentId,
    studentId,
    teacherId,
    teacherId
  });
  await doc.save();
});