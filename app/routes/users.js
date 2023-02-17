var express  = require('express');
import UserContrller  from  '../controller/userController'
import checkUserAuth  from  '../middleware/auth-middleware'
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', UserContrller.userRegistration);
router.post('/login', UserContrller.userLogin);
router.get('/logged', checkUserAuth , UserContrller.userLogged);
router.post('/change_password', checkUserAuth , UserContrller.changePassword);
router.post('/reset_password' , UserContrller.sendUserPasswordResetEmail);
router.post('/reset_password/:id/:token', UserContrller.userPasswordReset)

module.exports = router;
// export default router;