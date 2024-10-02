'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moldes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Moldes.init({
    nome_mold: DataTypes.STRING,
    form_mold: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Moldes',
    tableName:'moldes',
  });
  return Moldes;
};