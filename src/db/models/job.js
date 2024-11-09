'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.hasOne(models.Post,{
        foreignKey: 'postId'
      })
      Job.hasMany(models.Apply,{
        foreignKey:'jobId'
      })
      // define association here
    }
  }
  Job.init({
    jobId: {
      autoIncrement:true,
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      field: 'job_id'
    },
    company:{
      type : DataTypes.STRING,
      allowNull:false
    },
    description:{
      type : DataTypes.STRING,
      allowNull:false
    },
    postId:{
      type:DataTypes.INTEGER,
      allowNull:true,
      field:'post_id'
    } 
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};