'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    static associate(models) {
      // Association for the user who created the challenge
      Games.belongsTo(models.User, {
        as: 'playerOneUser', // Alias for clarity
        foreignKey: 'playerOne',
      });

      // Association for the user being challenged
      Games.belongsTo(models.User, {
        as: 'playerTwoUser', // Alias for clarity
        foreignKey: 'playerTwo',
      });
    }
  }

  Games.init(
    {
        gameId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field:'game_id'
          },
          playerOne: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'player_one'
          },
          playerTwo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field:'player_two'
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            field:'created_at'
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            field:'updated_at'
          },
          gameCode:{
            type:DataTypes.STRING,
            allowNull:true,
            field:'game_code'
          },
          status:{
            type: DataTypes.ENUM('pending','inProgress' ,'completed'),
            allowNull:false,
            defaultValue:'pending'
          }
    },
    {
      sequelize,
      modelName: 'Games', // Class name should be consistent with PascalCase
      tableName: 'Games', // Specify the table name explicitly
    }
  );

  return Games;
};
