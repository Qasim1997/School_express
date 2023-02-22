"use strict";

var _multer = _interopRequireDefault(require("multer"));
var _studentController = _interopRequireDefault(require("../controller/studentController"));
var _teacherController = _interopRequireDefault(require("../controller/teacherController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const express = require("express");
var path = require("path");
var router = express.Router();
const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = (0, _multer.default)({
  storage: storage
});
router.get("/", _studentController.default.getStudentAll);
router.post("/", upload.single("image"), _studentController.default.saveStudent);
router.get("/:id", _studentController.default.getStudentById);
router.patch("/:id", upload.single("image"), _teacherController.default.updateTeacher);
router.delete("/:id", _studentController.default.destroyTeacher);
module.exports = router;