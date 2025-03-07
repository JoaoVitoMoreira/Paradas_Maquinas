module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Usuarios', 'id_usua', {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Usuarios', 'id_usua');
  }
};
