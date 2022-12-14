'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({departments,roles}) {
      // define association here
      users.belongsTo(departments,{foreignKey:'deptid'})

      users.belongsTo(roles,{foreignKey:'roleid'})

    }
  }
  users.init({
    username: DataTypes.STRING
  }, {
    sequelize,
    tableName:'users',
    modelName: 'users',
  });
  return users;
};