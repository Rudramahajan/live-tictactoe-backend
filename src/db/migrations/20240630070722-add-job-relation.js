'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.changeColumn('Applies','user_id',{
    type:Sequelize.INTEGER,
      allowNull:false,
      references : {
        model:'Users',
        key:'user_id'
      }
   })

   await queryInterface.changeColumn('Applies','job_id',{
    type:Sequelize.INTEGER,
      allowNull:false,
    references : {
      model:'Jobs',
      key:'job_id'
    }
 })
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
