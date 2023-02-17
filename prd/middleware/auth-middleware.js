"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const User = require("../models").User;
const checkUserAuth = async (req, res, next) => {
  let token;
  const {
    authorization
  } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1];
      // Verify Token
      const {
        userID
      } = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
      // Get User from Token
      req.user = await User.findOne({
        where: {
          email: userID
        }
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({
        "status": "failed",
        "message": "Unauthorized User"
      });
    }
  }
  if (!token) {
    res.status(401).send({
      "status": "failed",
      "message": "Unauthorized User, No Token"
    });
  }
};
var _default = checkUserAuth;
exports.default = _default;