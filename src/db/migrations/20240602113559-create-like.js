'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      likeId: {
        autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'like_id',
      primaryKey: true
      },
      userId: {
        name: 'userId',
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'Users',  
          key: 'user_id'        
        },
      },
      postId: {
        name: 'postId',
        type: Sequelize.INTEGER,
        field: 'post_id',
        allowNull: false,
        references: {
          model: 'Posts',  
          key: 'post_id'        
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
    await queryInterface.dropTable('Likes');
  }
};