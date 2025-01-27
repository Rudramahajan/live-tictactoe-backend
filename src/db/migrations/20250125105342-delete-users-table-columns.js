'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'fullName');
    await queryInterface.removeColumn('Users', 'avatar');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'fullName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
    });
  }
};
