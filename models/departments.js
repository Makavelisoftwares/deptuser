'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      departments.hasMany(users,{foreignKey:'deptid'})
    }
  }
  departments.init({
    deptname: DataTypes.STRING
  }, {
    sequelize,
    tableName:'departments',
    modelName: 'departments',
  });
  return departments;
};