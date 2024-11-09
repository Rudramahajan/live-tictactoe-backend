'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.hasOne(models.Post,{
        foreignKey:'postId'
      })
      Like.hasOne(models.User,{
        foreignKey:'userId'
      })
      // define association here
    }
  }
  Like.init({
    likeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'like_id',
      primaryKey: true
    },
    userId: {
      name: 'userId',
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      name: 'postId',
      field: 'post_id',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};