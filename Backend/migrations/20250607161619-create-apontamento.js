'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apontamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_servico: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      tempo_inicial: {
        type: Sequelize.DATE
      },
      tempo_final: {
        type: Sequelize.DATE
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      unidade: {
        type: Sequelize.STRING
      },
      ordem_producao: {
        type: Sequelize.STRING
      },
      id_usua: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apontamentos');
  }
};