'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessao extends Model {
    static associate(models) {
      Sessao.belongsTo(models.Usuario, {
        foreignKey: 'id_usua',
        as: 'usuario'
      });
    }
  }
  Sessao.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_usua: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sessao',
    tableName: 'Sessoes' 
  });
  return Sessao;
};