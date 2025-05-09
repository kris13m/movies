const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeInstance');

class Genre extends Model {}

Genre.init({
  genre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'genres',
  timestamps: false
});

module.exports = Genre;