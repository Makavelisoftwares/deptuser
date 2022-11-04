'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      roles.hasMany(users,{foreignKey:'roleid'})
    }
  }
  roles.init({
    rolename: DataTypes.STRING
  }, {
    sequelize,
    tableName:'roles',
    modelName: 'roles',
  });
  return roles;
};