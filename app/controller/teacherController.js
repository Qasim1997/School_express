import TeacherService from "../service/TeacherService";
import express from "express";

const Teacher = require("../models").Teacher;

export default class teacherContrller {
  static getAllTeacher = async (req, res) => {
    // const teacher = TeacherService.getAllTeacher()
    // const users = await Teacher.findAll();
    // res.status(200).json(users);
    Teacher.findAll()
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  };

  static saveTeacher = async (req, res, next) => {
    const { firstName, lastName, age, contact_number, address } = req.body;
    if (firstName && lastName && age && contact_number && address) {
      try {
        console.log(req.body, "teachercontoller");
        const teacher = TeacherService.saveTeacher(req);
        res
          .status(200)
          .json({ status: "success", message: "teacher save Successfully" });
      } catch (error) {
        console.log(
          error.message,
          "errormessagemessagemessagemessagemessagemessagemessagemessage"
        );
      }
    } else {
      res.status(400).json({ message: "All field is required" });
    }
  };
  static getTeacherById = async (req, res) => {
    try {
      const teacher = TeacherService.getTeacherById(req,res);
      console.log("first");
      // const {id} = req.params;
      // const teacher = await Teacher.findByPk(id);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "backend error" });

    }
   
  };

  static updateTeacher = async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, age, contact_number, image, address } =
      req.body;

    try {
      // const teacher = TeacherService.updateTeacher(req);
      console.log(req.body, "body......................................");
      console.log(req.params, "body......................................");
      console.log(id, "body......................................");
      Teacher.update(
        { id: id },
        {
          where: {
            firstName: firstName,
            lastName: lastName,
            age: age,
            contact_number: contact_number,
            image: req.file.filename,
            address: address,
          },
        }
      ).then((result) => {
        console.log(
          result,
          "result ---------------------------------------------------------------"
        ); // will return the number of affected rows
      });
      res
        .status(200)
        .json({ status: "success", message: "Registration Success" });
    } catch (error) {
      res.status(400).json({ status: "success", message: error });
    }
  };
  static destroyTeacher  = async (req, res) => {

    TeacherService.deleteTeacher(req, res);
  };
}
