const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teste', 'postgres', '5DY5Nweb9', {
    host: '135.224.15.6',
    dialect: 'postgres',
});

module.exports = sequelize;