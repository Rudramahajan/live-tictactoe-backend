'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasOne(models.User,{
        foreignKey:'userId'
      })
      Post.hasMany(models.Like,{
        foreignKey:'userId'
      })
      Post.hasOne(models.Job,{
        foreignKey:'postId'
      })
    }
  }
  Post.init({
    postId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id',
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};