const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {

}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        job_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_url: {
            type: DataTypes.BLOB,
            allowNull: false,
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
        modelName: 'job'
    }
);

module.exports = Job;