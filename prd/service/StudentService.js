"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Student = require("../models").Student;
class StudentService {}
exports.default = StudentService;
_defineProperty(StudentService, "getStudentAll", async res => {
  Student.findAll().then(student => res.status(200).send(student)).catch(error => res.status(400).send(error));
});
_defineProperty(StudentService, "saveStudent", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    contact_number,
    rollnumber,
    address
  } = req.body;
  const doc = new Student({
    firstName: firstName,
    lastName: lastName,
    age: age,
    contact_number: contact_number,
    rollnumber: rollnumber,
    display_name: firstName + ' ' + lastName,
    image: req.file.filename,
    address: address
  });
  await doc.save();
});
_defineProperty(StudentService, "getStudentById", async (req, res) => {
  const {
    id
  } = req.params;
  console.log(id, "id");
  const student = await Student.findByPk(id);
  console.log(student, "Teacher------------");
  res.status(200).json({
    status: "success",
    result: student
  });
});
_defineProperty(StudentService, "deleteStudent", async (req, res) => {
  const {
    id
  } = req.params;
  await Student.destroy({
    where: {
      id: id
    }
  }).then(result => {
    console.log(result); // will return the number of deleted rows
    res.status(200).json({
      status: "success",
      message: "Student deleted successfully"
    });
  }).catch(error => {
    console.log(error); // will return the number of deleted rows
    res.status(400).json({
      status: "failed",
      message: error
    });
  });
});