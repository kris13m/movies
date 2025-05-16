const db = require('../config/sequelizeInstance');  // Import the database connection
const { Movie, Genre, List } = require('../models');

async function getListsByUserId(id) {
    return List.findAll({
        where: { user_id: id }
    });
}

function createList(userId, name) {
  return List.create({
    user_id: userId,
    name: name
  });
}

async function getMoviesByListId(id) {
  const list = await List.findByPk(id, {
    include: {
      model: Movie,
      through: { attributes: [] }, // exclude join table info
    },
  });

  if (!list) {
    throw new Error('List not found');
  }

  return list.Movies;
}

async function addMovieToList(listId, movieId){
    console.log("we're here");

  const list = await List.findByPk(listId);
  const movie = await Movie.findByPk(movieId);

  if (!list || !movie) {
    throw new Error('List or movie not found');
  }

  await list.addMovie(movie);
}


module.exports = { getListsByUserId, createList, getMoviesByListId, addMovieToList };