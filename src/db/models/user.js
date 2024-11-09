'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{
        foreignKey:'userId'
      })
      User.hasMany(models.Conversation,{
        foreignKey: 'participantOneId'
      })
      User.hasMany(models.Conversation,{
        foreignKey: 'participantTwoId'
      })
      User.hasMany(models.Apply,{
        foreignKey:'userId'
      })
    }
  }
  User.init({
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
      // set indeex true for optimising field for search
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};