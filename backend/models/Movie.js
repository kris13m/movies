const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeInstance');

class Movie extends Model {}

Movie.init({
  movie_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tagline: DataTypes.STRING,
  backdrop_path: DataTypes.STRING(500),
  release_date: DataTypes.DATE,
  original_language: DataTypes.STRING(10),
  overview: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Movie',
  tableName: 'movies',
  timestamps: false
});

module.exports = Movie;