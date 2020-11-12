const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PageView extends Model {}

PageView.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
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
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'PageView'
    }
)

module.exports = PageView;