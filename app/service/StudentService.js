
const Student  = require("../models").Student;

export default class StudentService {
    static getStudentAll = async(res) => {

        Student.findAll()
        .then((student) => res.status(200).send(student))
        .catch((error) => res.status(400).send(error));
    }
    static saveStudent = async(req, res) => {
        const { firstName, lastName, age, contact_number, rollnumber, address} = req.body;

        const doc = new Student({
            firstName: firstName,
            lastName: lastName,
            age: age,
            contact_number: contact_number,
            rollnumber: rollnumber,
            display_name: firstName + ' ' +  lastName,
            image: req.file.filename,
            address: address,
          });
          await doc.save();


    };
    static getStudentById = async (req, res) => {
        const { id } = req.params;
        console.log(id, "id");
        const student = await Student.findByPk(id);
        console.log(student, "Teacher------------");
        res.status(200).json({ status: "success", result: student });
      };
    
      static deleteStudent = async (req, res) => {
        const { id } = req.params;
        await Student.destroy({
          where: { id: id },
        })
          .then((result) => {
            console.log(result); // will return the number of deleted rows
            res
              .status(200)
              .json({ status: "success", message: "Student deleted successfully" });
          })
          .catch((error) => {
            console.log(error); // will return the number of deleted rows
            res.status(400).json({ status: "failed", message: error });
          });
      };

}