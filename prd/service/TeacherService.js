"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Teacher = require("../models").Teacher;
class TeacherService {}
exports.default = TeacherService;
_defineProperty(TeacherService, "getAllTeacher", async () => {
  const user = await Teacher.findAll();
  console.log(user, 'user');
  return user;
});
_defineProperty(TeacherService, "saveTeacher", async req => {
  const {
    firstName,
    lastName,
    age,
    contact_number,
    image,
    address
  } = req.body;
  // const teacher = await Teacher.create({
  console.log("body");
  console.log("req.file.image,", req.file);
  const doc = new Teacher({
    firstName: firstName,
    lastName: lastName,
    age: age,
    contact_number: contact_number,
    image: req.file.filename,
    address: address
  });
  //   }, { fields: ['firstName', 'lastName', 'age', 'contact_number', 'image', 'address'] });
  await doc.save();
});
_defineProperty(TeacherService, "getTeacherById", async (req, res) => {
  const {
    id
  } = req.params;
  console.log(id, 'id');
  const teacher = await Teacher.findByPk(id);
  console.log(teacher, 'Teacher------------');
  res.status(200).json({
    status: "success",
    result: teacher
  });
});
_defineProperty(TeacherService, "updateTeacher", async (req, res) => {
  const {
    id
  } = req.params;
  const {
    firstName,
    lastName,
    age,
    contact_number,
    image,
    address
  } = req.body;
  const user = await Teacher.findByPk(id);
  user.firstName = firstName;
  user.lastName = lastName, user.age = age, user.contact_number = contact_number,
  // user.image =  req.file.filename,
  user.address = address, await user.save();
});
_defineProperty(TeacherService, "deleteTeacher", async (req, res) => {
  const {
    id
  } = req.params;
  await Teacher.destroy({
    where: {
      id: id
    }
  }).then(result => {
    console.log(result); // will return the number of deleted rows
    res.status(200).json({
      status: "success",
      message: "Teacher deleted successfully"
    });
  }).catch(error => {
    console.log(error); // will return the number of deleted rows
    res.status(400).json({
      status: "failed",
      message: error
    });
  });
});