import StudentService from "../service/StudentService";

export default class studentContrller {
  static getStudentAll = async (req, res) => {
    try {
      const student = await StudentService.getStudentAll(res);
    } catch (error) {
      res.status(400).json({ status: "failed", message: "Backend error" });
    }
  };
  static saveStudent = async (req, res) => {
    const { firstName, lastName, age, contact_number, rollnumber, address } =
      req.body;
    if (
      (firstName && lastName && age && contact_number && address, rollnumber)
    ) {
      try {
        const student = await StudentService.saveStudent(req, res);
        res
          .status(200)
          .json({ status: "success", message: "Student Save Successfully" });
      } catch (error) {
        res.status(400).json({ status: "failed", message: error });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Please fill all the fields" });
    }
  };
  static getStudentById = async (req, res) => {
    try {
      const student = StudentService.getStudentById(req, res);
      // const {id} = req.params;
      // const teacher = await Teacher.findByPk(id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "backend error" });
    }
  };

  static destroyTeacher = async (req, res) => {
    StudentService.deleteStudent(req, res);
  };
}
