const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeInstance');

class List extends Model {}

List.init({
    list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'List',
    tableName: 'lists',
    timestamps: false
})

module.exports = List