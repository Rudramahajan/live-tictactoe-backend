'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('Jobs', 'post_id',{
      type:Sequelize.INTEGER,
      allowNull:true,
      field:'post_id',
      references:{
        model:'Posts',
        key:'post_id'
      }
    })


    await queryInterface.changeColumn('Posts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Set to false if the column should not be nullable
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
