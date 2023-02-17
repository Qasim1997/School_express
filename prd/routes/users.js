"use strict";

var _userController = _interopRequireDefault(require("../controller/userController"));
var _authMiddleware = _interopRequireDefault(require("../middleware/auth-middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', _userController.default.userRegistration);
router.post('/login', _userController.default.userLogin);
router.get('/logged', _authMiddleware.default, _userController.default.userLogged);
router.post('/change_password', _authMiddleware.default, _userController.default.changePassword);
router.post('/reset_password', _userController.default.sendUserPasswordResetEmail);
router.post('/reset_password/:id/:token', _userController.default.userPasswordReset);
module.exports = router;
// export default router;