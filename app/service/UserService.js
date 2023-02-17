const User = require("../models").User;

import bcrypt from "bcrypt";
export default class UserService {
  static register = async (data) => {
    const { firstName, lastName, email, password, confirmed_password } =
    data;
    // this.firstBrother = name;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(data, "body");
    const doc = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });
    await doc.save();
  };
}
