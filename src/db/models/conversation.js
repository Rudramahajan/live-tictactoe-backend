'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.hasOne(models.User,{
        foreignKey:'userId'
      })
      Conversation.hasOne(models.User,{
        foreignKey:'userId'
      })
      Conversation.hasMany(models.Message,{
        foreignKey:'conversationId'
      })
    }
  }
  Conversation.init({
    conversationId: {
      type : DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
      field: 'conversation_id'
    },
    participantOneId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      field: 'participant_one_id'
    },
    participantTwoId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      field: 'participant_two_id'
    }
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};