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
            allowNull: false,
            unique: false,
            references: {
                model: 'user',
                key: 'id'
            }

        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'job',
                key: 'id'
            }

        },
        counter: {
            type: DataTypes.INTEGER
        }
        // time: {
            
        // }

    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'pageview'
    }
)

module.exports = PageView;