"use strict";

var express = require("express");
const User = require("../models").User;
const Teacher = require("../models").Teacher;
const Student = require("../models").Student;
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome");
});
router.get("/com", (req, res) => {
  User.findAll({
    include: [{
      model: Teacher && Student
    }]
  }).then(user => res.status(200).send(user)).catch(error => res.status(400).send(error));
});
module.exports = router;