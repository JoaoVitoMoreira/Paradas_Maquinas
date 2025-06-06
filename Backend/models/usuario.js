'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Sessao, {
        foreignKey: 'id_usua',
        as: 'sessoes'
      });
    }
  }
  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome_usua: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha_usua: {
      type: DataTypes.STRING,
      allowNull: false
    },
    func_usua: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios'
  });
  return Usuario;
};