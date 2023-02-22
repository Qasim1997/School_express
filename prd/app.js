"use strict";

var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("./routes/index"));
var _users = _interopRequireDefault(require("./routes/users"));
var _teacher = _interopRequireDefault(require("./routes/teacher"));
var _student = _interopRequireDefault(require("./routes/student"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const express = require('express');
const cors = require('cors');
_dotenv.default.config();
var app = express();
app.use((0, _morgan.default)('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/', _index.default);
app.use('/users', _users.default);
app.use('/api/teacher', _teacher.default);
app.use('/student', _student.default);
const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
module.exports = app;