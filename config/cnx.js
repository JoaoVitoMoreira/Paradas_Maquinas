const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('paradas-maquinas', 'postgres', 'qIBg*T:nd"cjNb-8', {
    host: '34.45.198.90',
    dialect: 'postgres',
});

module.exports = sequelize;
