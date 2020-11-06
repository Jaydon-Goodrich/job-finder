const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends model { }

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            allownull: false,
            references: {
                model: 'user',
                key: 'id'
            }

        },
        job_id: {
            type: DataTypes.INTEGER,
            allownull: false,
            references: {
                model: 'job',
                key: 'id'
            }

        }

    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'vote'
    }
)

module.exports = Favorite;