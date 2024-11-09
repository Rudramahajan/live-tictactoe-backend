'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.hasOne(models.Post,{
        foreignKey:'postId'
      })
      comment.hasOne(models.User,{
        foreignKey:'userId'
      })
      // define association here
    }
  }
  comment.init({
    commentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'comment_id',
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id',
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};