const Movie = require('./Movie');
const Genre = require('./Genre');

// associations
Movie.belongsToMany(Genre, {
    through: 'movies_genres',
    foreignKey: 'movie_id',
    otherKey: 'genre_id',
    timestamps: false //
  });
  
  Genre.belongsToMany(Movie, {
    through: 'movies_genres',
    foreignKey: 'genre_id',
    otherKey: 'movie_id',
    timestamps: false // 
  });


module.exports = { Movie, Genre };