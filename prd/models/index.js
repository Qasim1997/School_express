"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 'use strict';

// // const fs = require('fs');
// // const path = require('path');
// // const Sequelize = require('sequelize');
// // const process = require('process');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // const config = require(__dirname + '/../config/config.js')[env];
// // const db = {};

// // let sequelize;
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// //   sequelize = new Sequelize(config.database, config.username, config.password, config);
// // }

// // fs
// //   .readdirSync(__dirname)
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     db[model.name] = model;
// //   });

// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// // module.exports = db;

// import fs from 'fs';
// import path from 'path';
// import Sequelize from 'sequelize';
// import configDB from '../config/database';

// const basename = path.basename(module.filename);
// const env = process.env.NODE_ENV || 'development';
// const config = configDB[env];

// const db = {};

// let sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config,
// );

// fs.readdirSync(__dirname)
//   .filter(
//     file =>
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
//   )
//   .forEach(file => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const basename = _path.default.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = _config.default[env];
console.log(config);
const db = {};
let sequelize = new _sequelize.default(config.database, config.username, config.password, config);
_fs.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  // const model = sequelize.import(path.join(__dirname, file));
  const model = require(_path.default.join(__dirname, file))(sequelize, _sequelize.default.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
module.exports = db;