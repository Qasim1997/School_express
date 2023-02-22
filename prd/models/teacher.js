'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.hasOne(models.User, {
        foreignKey: "teacherId"
      });
    }
  }
  Teacher.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    contact_number: DataTypes.INTEGER,
    image: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Teacher'
  });
  Teacher.associate = models => {
    Teacher.hasMany(models.User, {
      foreignKey: 'teacherId',
      as: 'teachers'
    });
  };
  return Teacher;
};