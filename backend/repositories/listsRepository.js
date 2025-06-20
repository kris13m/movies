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
  const listInstance = await List.findByPk(id, {
    include: {
      model: Movie,
      through: { attributes: [] },
    },
  });

  if (!listInstance) {
    throw new Error('List not found');
  }

  const listData = listInstance.toJSON();

  const moviesArray = listData.Movies || [];

  delete listData.Movies;

  return {
    list: listData,     
    movies: moviesArray  
  };
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

async function deleteMovieFromList(listId, movieId) {
  const list = await List.findByPk(listId);
  const movie = await Movie.findByPk(movieId);

  if (!list || !movie) {
    throw new Error('List or movie not found');
  }

  await list.removeMovie(movie);
}

/*
async function deleteList(id) {
  return await List.destroy({ where: {list_id: id } });
}
  */

async function deleteListById(id, userId) {
  const deletedRowCount = await List.destroy({
    where: {
      list_id: id,      // Must match the list ID
      user_id: userId   // AND must be owned by the logged-in user
    }
  });
  return deletedRowCount;
}


module.exports = { getListsByUserId, createList, getMoviesByListId, addMovieToList, deleteMovieFromList, deleteListById };