const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/cnx.js');

class Moldes extends Model {}

Moldes.init({
  id_mold: {
    type: DataTypes.INTEGER,
    primaryKey: true,     
    autoIncrement: true,    
  },
  nome_mold: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  form_mold: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Moldes',
  tableName: 'moldes',
  primaryKey: 'id_mold',
  timestamps: false
});


module.exports = Moldes;
