const { sequelize } = require("./User");

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class viewedJobs extends Model {

}

viewedJobs(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        job_name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        job_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'viewedJobs'
    }
);

module.exports = viewedJobs;