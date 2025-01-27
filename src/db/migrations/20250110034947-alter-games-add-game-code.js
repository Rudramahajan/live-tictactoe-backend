module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Games', 'game_code', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '', // Set a default value or remove this line if not required
    });
    await queryInterface.changeColumn('Games', 'player_two', {
      type: Sequelize.INTEGER,
      allowNull: true,
      field:'player_two'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Games', 'game_code');
    await queryInterface.changeColumn('Games', 'player_two', {
      type: Sequelize.INTEGER, // Revert to the original type
      allowNull: false, // Or whatever the original configuration was
      field:'player_two'
    });
  },
};
