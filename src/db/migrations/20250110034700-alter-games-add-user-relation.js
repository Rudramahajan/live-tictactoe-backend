'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key constraint for 'challange_by'
    await queryInterface.addConstraint('Games', {
      fields: ['player_one'],
      type: 'foreign key',
      name: 'fk_player_one_user', // Constraint name
      references: {
        table: 'Users', // Referenced table
        field: 'user_id',    // Referenced column
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Add foreign key constraint for 'challange_to'
    await queryInterface.addConstraint('Games', {
      fields: ['player_two'],
      type: 'foreign key',
      name: 'fk_player_two_user', // Constraint name
      references: {
        table: 'Users', // Referenced table
        field: 'user_id',    // Referenced column
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint for 'challange_by'
    await queryInterface.removeConstraint('Games', 'fk_player_one_user');

    // Remove foreign key constraint for 'challange_to'
    await queryInterface.removeConstraint('Games', 'fk_player_two_user');
  },
};
