'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'type', {
      type: Sequelize.STRING,
      allowNull: true,  // Set to false if the column should not be nullable
      defaultValue:'post',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'  // Adjust as necessary for your use case
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
