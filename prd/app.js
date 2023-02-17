"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("./routes/index"));
var _users = _interopRequireDefault(require("./routes/users"));
var _Brother = _interopRequireDefault(require("./class/Brother"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use('/', _index.default);
app.use('/users', _users.default);
const port = 3000;
app.use((0, _cors.default)());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;