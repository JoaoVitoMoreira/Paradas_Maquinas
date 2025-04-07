'use strict';
const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model { }

    Usuario.init({
        id_usua: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome_usua: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha_usua: {
            type: DataTypes.STRING,
            allowNull: false
        },
        func_usua: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        primaryKey: 'id_usua',
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
};
