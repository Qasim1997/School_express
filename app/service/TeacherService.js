import multer from "multer";

const Teacher = require("../models").Teacher;

export default class TeacherService {
  static getAllTeacher = async () => {
    const user = await  Teacher.findAll()
    console.log(user, 'user')
    return user;
  };
  static saveTeacher = async (req) => {
    const { firstName, lastName, age, contact_number, image, address } = req.body;
    // const teacher = await Teacher.create({
    console.log("body");
    console.log("req.file.image," ,req.file);

    const doc = new Teacher({
      firstName: firstName,
      lastName: lastName,
      age: age,
      contact_number: contact_number,
      image: req.file.filename,
      address: address,
    });
    //   }, { fields: ['firstName', 'lastName', 'age', 'contact_number', 'image', 'address'] });
    await doc.save();
  };
  static getTeacherById = async (req, res) => {
    const {id} = req.params;
    console.log(id, 'id')
    const teacher = await Teacher.findByPk(id);
    console.log(teacher, 'Teacher------------')
    res.status(200).json({ status: "success", result: teacher });
  }
  static updateTeacher = async (req, res) => {
    const {id} = req.params;
    const { firstName, lastName, age, contact_number, image, address } = req.body;
    const user = await Teacher.findByPk(id);
    user.firstName = firstName;
    user.lastName =  lastName,
    user.age =  age,
    user.contact_number =  contact_number,
    // user.image =  req.file.filename,
    user.address =  address,
    await user.save();
  }
  static deleteTeacher = async (req, res) => {
    const {id} = req.params;
    await Teacher.destroy({
      where: { id: id }
    }).then((result) => {
      console.log(result); // will return the number of deleted rows
      res.status(200).json({ status: "success", message: "Teacher deleted successfully"});
    }).catch((error) =>{
      console.log(error); // will return the number of deleted rows
      res.status(400).json({ status: "failed", message: error});
    })

  }
}
