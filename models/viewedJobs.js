const { sequelize } = require("./User");

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class viewedJobs extends Model {

}

viewedJobs.init(
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
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: true,
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