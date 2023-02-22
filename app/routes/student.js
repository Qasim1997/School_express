const express = require("express");
var path = require("path");

import multer from "multer";
import studentContrller from "../controller/studentController";
// const { default: teacherContrller } = require('../controller/teacherController');
import teacherContrller from "../controller/teacherController";
var router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage
});


router.get("/", studentContrller.getStudentAll);
router.post("/", upload.single("image"), studentContrller.saveStudent);
router.get("/:id", studentContrller.getStudentById);

router.patch("/:id", upload.single("image"), teacherContrller.updateTeacher);
router.delete("/:id", studentContrller.destroyTeacher);

module.exports = router;
