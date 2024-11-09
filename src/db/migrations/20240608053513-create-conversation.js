'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      conversationId: {
        type : Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement: true,
        field: 'conversation_id'
      },
      participantOneId: {
        type : Sequelize.INTEGER,
        allowNull: false,
        field: 'participant_one_id',
        references: {
          model: 'Users',  
          key: 'user_id'        
        },
      },
      participantTwoId: {
        type : Sequelize.INTEGER,
        allowNull: false,
        field: 'participant_two_id',
        references: {
          model: 'Users',  
          key: 'user_id'        
        },
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
    await queryInterface.dropTable('Conversations');
  }
};