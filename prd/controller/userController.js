"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _emailConfig = _interopRequireDefault(require("../config/emailConfig.js"));
var _UserService = _interopRequireDefault(require("../service/UserService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// const User = required('../models/user');
const User = require("../models").User;
const Teacher = require('../models').Teacher;
class UserContrller {}
exports.default = UserContrller;
_defineProperty(UserContrller, "userRegistration", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmed_password
  } = req.body;
  if (firstName && lastName && email && password && confirmed_password) {
    if (password === confirmed_password) {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (user) {
        res.status(400).json({
          message: "User already exists"
        });
      } else try {
        _UserService.default.register(req.body);

        // Generate JWT Token
        res.status(200).json({
          status: "success",
          message: "Registration Success"
        });
      } catch (error) {
        console.log(error);
        if (error.studentId === 'SequelizeValidationError') {
          console.error('Validation error: ', error.message);
        } else {
          console.error('Error: ', error);
        }
        res.send({
          status: "failed",
          message: "Unable to Register"
        });
      }
    } else {
      res.status(400).json({
        message: "password & confirmed_password does not match"
      });
    }
  } else {
    res.status(400).json({
      message: "Please fill all fields"
    });
  }
});
_defineProperty(UserContrller, "userLogin", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (email && password) {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (user != null) {
        const isMatch = await _bcrypt.default.compare(password, user.password);
        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = _jsonwebtoken.default.sign({
            userID: user.email
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: "5d"
          });
          res.send({
            status: "success",
            message: "Login Success",
            token: token
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid"
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User"
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All Fields are Required"
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Unable to Login"
    });
  }
});
_defineProperty(UserContrller, "userLogged", async (req, res) => {
  User.findByPk(req.user.id, {
    attributes: {
      exclude: ["password"]
    },
    include: [{
      model: Teacher
    }]
    // exclude: ["password"] 
  }).then(user => {
    console.log(user, 'user--------------');
    if (!user) {
      return res.status(404).send({
        message: "Invalid User"
      });
    }
    return res.status(200).send(user);
  }).catch(error => res.status(400).send(error));
});
_defineProperty(UserContrller, "changePassword", async (req, res) => {
  const {
    password,
    confirmed_password
  } = req.body;
  if (password && confirmed_password) {
    if (password === confirmed_password) {
      try {
        const salt = await _bcrypt.default.genSalt(10);
        const hashPassword = await _bcrypt.default.hash(password, salt);
        const user = await User.findByPk(req.user.id);
        user.password = hashPassword;
        await user.save();
        res.status(200).send({
          status: "success",
          message: "Password Changed Successfully"
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Unable to Change Password"
        });
      }
    } else {
      res.status(400).json({
        message: "password & confirmed_password does not match"
      });
    }
  } else {
    res.status(400).json({
      message: "password & confirmed_password does not match"
    });
  }
});
_defineProperty(UserContrller, "sendUserPasswordResetEmail", async (req, res) => {
  const {
    email
  } = req.body;
  console.log(email, 'before password reset');
  if (email) {
    console.log(email, 'after password reset');
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    console.log(user, 'user data');
    if (user) {
      const secret = user.id + process.env.JWT_SECRET_KEY;
      const token = _jsonwebtoken.default.sign({
        userID: user.id
      }, secret, {
        expiresIn: "15min"
      });
      const link = `https://localhost:3000/user/reset_password/${user.id}/${token}`;
      console.log(link, "token");
      // Send Email
      let info = await _emailConfig.default.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "GeekShop - Password Reset Link",
        html: `<a href=${link}>Click Here</a> to Reset Your Password`
      });
      res.send({
        status: "success",
        message: "Password Reset Email Sent... Please Check Your Email",
        info: info
      });
    } else {
      res.status(400).json({
        message: "User does not exist"
      });
    }
  } else {
    res.status(400).json({
      message: "Please fill all fields"
    });
  }
});
_defineProperty(UserContrller, "userPasswordReset", async (req, res) => {
  const {
    password,
    confirmed_password
  } = req.body;
  const {
    id,
    token
  } = req.params;
  const user = await User.findByPk(id);
  const new_secret = user.id + process.env.JWT_SECRET_KEY;
  try {
    _jsonwebtoken.default.verify(token, new_secret);
    if (password && confirmed_password) {
      if (password !== confirmed_password) {
        res.send({
          "status": "failed",
          "message": "New Password and Confirm New Password doesn't match"
        });
      } else {
        const salt = await _bcrypt.default.genSalt(10);
        const newHashPassword = await _bcrypt.default.hash(password, salt);
        // await User.findByIdAndUpdate(user.id, { $set: { password: newHashPassword } })
        await User.update({
          password: newHashPassword
        }, {
          where: {
            id: user.id // the primary key value of the record you want to update
          }
        }).then(rowsUpdated => {
          res.send({
            "status": "success",
            "message": "Password Reset Successfully"
          });
        });
      }
    } else {
      res.send({
        "status": "failed",
        "message": "All Fields are Required"
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      "status": "failed",
      "message": "Invalid Token"
    });
  }
});