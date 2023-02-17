"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsTo(models.Teacher, {
      //   foreignKey: "teacherId",
      // });
      // User.belongsTo(models.Student, {
      //   foreignKey: "studentId",
      // });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      teacherId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      onDelete: 'CASCADE'
    });
    User.belongsTo(models.Student, {
      foreignKey: 'studentId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
