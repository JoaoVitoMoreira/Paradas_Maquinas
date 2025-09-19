'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Este comando altera a coluna 'senha_usua' da tabela 'Usuarios'
    await queryInterface.changeColumn('Usuarios', 'senha_usua', {
      type: Sequelize.STRING, // O tipo CORRETO
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Este comando reverte a alteração, caso seja necessário
    await queryInterface.changeColumn('Usuarios', 'senha_usua', {
      type: Sequelize.INTEGER, // O tipo ANTIGO e incorreto
      allowNull: false,
    });
  }
};