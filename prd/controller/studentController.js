"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _StudentService = _interopRequireDefault(require("../service/StudentService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class studentContrller {}
exports.default = studentContrller;
_defineProperty(studentContrller, "getStudentAll", async (req, res) => {
  try {
    const student = await _StudentService.default.getStudentAll(res);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Backend error"
    });
  }
});
_defineProperty(studentContrller, "saveStudent", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    contact_number,
    rollnumber,
    address
  } = req.body;
  if (firstName && lastName && age && contact_number && address, rollnumber) {
    try {
      const student = await _StudentService.default.saveStudent(req, res);
      res.status(200).json({
        status: "success",
        message: "Student Save Successfully"
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error
      });
    }
  } else {
    res.status(400).json({
      status: "failed",
      message: "Please fill all the fields"
    });
  }
});
_defineProperty(studentContrller, "getStudentById", async (req, res) => {
  try {
    const student = _StudentService.default.getStudentById(req, res);
    // const {id} = req.params;
    // const teacher = await Teacher.findByPk(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "backend error"
    });
  }
});
_defineProperty(studentContrller, "destroyTeacher", async (req, res) => {
  _StudentService.default.deleteStudent(req, res);
});