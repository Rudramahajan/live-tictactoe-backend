'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.hasOne(models.Conversation,{
        foreignKey: 'conversationId'
      })
      Message.hasOne(models.User,{
        foreignKey: 'userId'
      })
      Message.hasOne(models.Post,{
        foreignKey: 'postId'
      })
      // define association here
    }
  }
  Message.init({
    messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        field: 'messgage_id'
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      postId : {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'post_id',
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id',
      },
      receipentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'receipent_id',
      }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};