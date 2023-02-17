// const User = required('../models/user');
const User = require("../models").User;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  transporter from '../config/emailConfig.js';
import UserService from "../service/UserService.js";
const Teacher = require('../models').Teacher;

export default class UserContrller {
  static userRegistration = async (req, res) => {
    const { firstName, lastName, email, password, confirmed_password } =
      req.body;
    if (firstName && lastName && email && password && confirmed_password) {
      if (password === confirmed_password) {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
          res.status(400).json({
            message: "User already exists",
          });
        } else
          try {
            UserService.register(req.body)

            // Generate JWT Token
            res.status(200).json({ status: "success", message: "Registration Success" });
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to Register" });
          }
      } else {
        res.status(400).json({
          message: "password & confirmed_password does not match",
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill all fields",
      });
    }
  };
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user.email },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };
  static userLogged = async (req, res) => {
    User.findByPk(req.user.id, {
      // attributes: { exclude: ["password"] }
      include: [
        {
          model: Teacher
        }
      ]
    })
      .then((user) => {
        console.log(user, 'user--------------')
        if (!user) {
          return res.status(404).send({ message: "Invalid User" });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  };
  static changePassword = async (req, res) => {
    const { password, confirmed_password } = req.body;
    if (password && confirmed_password) {
      if (password === confirmed_password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const user = await User.findByPk(req.user.id);
          user.password = hashPassword;
          await user.save();
          res
            .status(200)
            .send({
              status: "success",
              message: "Password Changed Successfully",
            });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Change Password" });
        }
      } else {
        res.status(400).json({
          message: "password & confirmed_password does not match",
        });
      }
    } else {
      res.status(400).json({
        message: "password & confirmed_password does not match",
      });
    }
  };
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email, 'before password reset')
    if (email) {
      console.log(email, 'after password reset')
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log(user, 'user data')
      if (user) {
        const secret = user.id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user.id }, secret, {
          expiresIn: "15min",
        });
        const link = `https://localhost:3000/user/reset_password/${user.id}/${token}`;
        console.log(link, "token");
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "GeekShop - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        });
        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
          info: info
        });
      } else {
        res.status(400).json({
          message: "User does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill all fields",
      });
    }
  };
  static userPasswordReset = async (req, res) => {
    const { password, confirmed_password } = req.body;
    const { id, token } = req.params;
    const user = await User.findByPk(id);
    const new_secret = user.id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && confirmed_password) {
        if (password !== confirmed_password) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          // await User.findByIdAndUpdate(user.id, { $set: { password: newHashPassword } })
         await  User.update({
            password: newHashPassword,
          }, {
            where: {
              id: user.id // the primary key value of the record you want to update
            }
          }).then(rowsUpdated => {
            res.send({ "status": "success", "message": "Password Reset Successfully" })
          });
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }


  };
}
