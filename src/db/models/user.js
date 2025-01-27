'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Games, {
        as: 'createdChallenges',
        foreignKey: 'player_one',
      });

      User.hasMany(models.Games, {
        as: 'receivedChallenges', 
        foreignKey: 'player_two',
      });
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};