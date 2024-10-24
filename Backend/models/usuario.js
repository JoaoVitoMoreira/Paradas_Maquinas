'use strict';
const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Usuario.init({
        id_usua: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome_usua: {
            type: DataTypes.STRING,
        },
        senha_usua: {
            type: DataTypes.INTEGER,
        },
        func_usua: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'Usuarios',
    });

    return Usuario;
};
