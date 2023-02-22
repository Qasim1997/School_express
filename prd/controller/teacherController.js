"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _TeacherService = _interopRequireDefault(require("../service/TeacherService"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Teacher = require("../models").Teacher;
class teacherContrller {}
exports.default = teacherContrller;
_defineProperty(teacherContrller, "getAllTeacher", async (req, res) => {
  // const teacher = TeacherService.getAllTeacher()
  // const users = await Teacher.findAll();
  // res.status(200).json(users);
  Teacher.findAll().then(user => res.status(200).send(user)).catch(error => res.status(400).send(error));
});
_defineProperty(teacherContrller, "saveTeacher", async (req, res, next) => {
  const {
    firstName,
    lastName,
    age,
    contact_number,
    address
  } = req.body;
  if (firstName && lastName && age && contact_number && address) {
    try {
      console.log(req.body, "teachercontoller");
      const teacher = _TeacherService.default.saveTeacher(req);
      res.status(200).json({
        status: "success",
        message: "teacher save Successfully"
      });
    } catch (error) {
      console.log(error.message, "errormessagemessagemessagemessagemessagemessagemessagemessage");
    }
  } else {
    res.status(400).json({
      message: "All field is required"
    });
  }
});
_defineProperty(teacherContrller, "getTeacherById", async (req, res) => {
  try {
    const teacher = _TeacherService.default.getTeacherById(req, res);
    console.log("first");
    // const {id} = req.params;
    // const teacher = await Teacher.findByPk(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "backend error"
    });
  }
});
_defineProperty(teacherContrller, "updateTeacher", async (req, res, next) => {
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
  try {
    // const teacher = TeacherService.updateTeacher(req);
    console.log(req.body, "body......................................");
    console.log(req.params, "body......................................");
    console.log(id, "body......................................");
    Teacher.update({
      id: id
    }, {
      where: {
        firstName: firstName,
        lastName: lastName,
        age: age,
        contact_number: contact_number,
        image: req.file.filename,
        address: address
      }
    }).then(result => {
      console.log(result, "result ---------------------------------------------------------------"); // will return the number of affected rows
    });

    res.status(200).json({
      status: "success",
      message: "Registration Success"
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error
    });
  }
});
_defineProperty(teacherContrller, "destroyTeacher", async (req, res) => {
  _TeacherService.default.deleteTeacher(req, res);
});