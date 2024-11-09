'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apply.hasOne(models.User,{
        foreignKey:'userId'
      })
      Apply.hasOne(models.Job,{
        foreignKey:'jobId'
      })
    }
  }
  Apply.init({
    applyId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field:'apply_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'user_id'
    },
    resume: {
      type: DataTypes.STRING
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field:'job_id'
    }
  }, {
    sequelize,
    modelName: 'Apply',
  });
  return Apply;
};