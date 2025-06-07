'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apontamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apontamento.init({
    cod_servico: DataTypes.STRING,
    descricao: DataTypes.STRING,
    tempo_inicial: DataTypes.DATE,
    tempo_final: DataTypes.DATE,
    quantidade: DataTypes.INTEGER,
    unidade: DataTypes.STRING,
    ordem_producao: DataTypes.STRING,
    id_usua: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apontamento',
  });
  return Apontamento;
};