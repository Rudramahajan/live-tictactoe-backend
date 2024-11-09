'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      messageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        field: 'messgage_id'
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'conversation_id'
        }
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postId : {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'post_id',
        references: {
          model: 'Posts',
          key: 'post_id'
        }
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'sender_id',
        references: {
          model: 'Users',
          key:'user_id'
        }
      },
      receipentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'receipent_id',
        references: {
          model: 'Users',
          key: 'user_id'
        }
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
    await queryInterface.dropTable('Messages');
  }
};