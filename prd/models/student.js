'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasOne(models.User, {
        foreignKey: "studentId"
      });
    }
  }
  Student.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    contact_number: DataTypes.INTEGER,
    display_name: DataTypes.STRING,
    rollnumber: DataTypes.INTEGER,
    image: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student'
  });
  Student.associate = models => {
    Student.hasMany(models.User, {
      foreignKey: 'studentId',
      as: 'students'
    });
  };
  return Student;
};