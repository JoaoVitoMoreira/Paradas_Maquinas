const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('maquinas-apontamento', 'postgres', 'G6xty:b;V;t(*sVp', {
    host: '34.72.222.186',
    dialect: 'postgres',
});

module.exports = sequelize;