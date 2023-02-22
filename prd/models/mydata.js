'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyData.init({
    title: DataTypes.STRING,
    image: DataTypes.BLOB,
    otherField: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyData'
  });
  return MyData;
};