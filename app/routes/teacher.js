const express = require("express");
var path = require("path");

import multer from "multer";
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


router.get("/", teacherContrller.getAllTeacher);
router.post("/", upload.single("image"), teacherContrller.saveTeacher);
router.get("/:id", teacherContrller.getTeacherById);

router.patch("/:id", upload.single("image"), teacherContrller.updateTeacher);
router.delete("/:id", teacherContrller.destroyTeacher);

module.exports = router;
