const User = require('./User');
const List = require('./List');
const Movie = require('./Movie');
const Genre = require('./Genre');


User.hasMany(List, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
List.belongsTo(User, {
  foreignKey: 'user_id',
});


List.belongsToMany(Movie, {
  through: 'lists_movies',
  foreignKey: 'list_id',
  otherKey: 'movie_id',
  timestamps: false,
});
Movie.belongsToMany(List, {
  through: 'lists_movies',
  foreignKey: 'movie_id',
  otherKey: 'list_id',
  timestamps: false,
});


Movie.belongsToMany(Genre, {
  through: 'movies_genres',
  foreignKey: 'movie_id',
  otherKey: 'genre_id',
  timestamps: false,
});
Genre.belongsToMany(Movie, {
  through: 'movies_genres',
  foreignKey: 'genre_id',
  otherKey: 'movie_id',
  timestamps: false,
});

module.exports = { User, List, Movie, Genre };