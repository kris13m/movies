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
/*
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
  */
 async function getMoviesByListId(id) {
  const listInstance = await List.findByPk(id, {
    include: {
      model: Movie,
      through: { attributes: [] },
    },
  });

  // 1. Handle the case where the list is not found
  // Your code throws an error, which is perfectly fine. The controller will catch it.
  if (!listInstance) {
    throw new Error('List not found');
  }

  // 2. Convert the complex Sequelize instance into a clean JavaScript object
  const listData = listInstance.toJSON();

  // 3. The movies are nested inside this object.
  const moviesArray = listData.Movies || [];

  // 4. Clean up: We don't need the 'Movies' array inside the main 'list' object anymore.
  delete listData.Movies;

  // 5. Return the structured object that the front-end now expects
  return {
    list: listData,      // This is now an object with list_id, name, etc.
    movies: moviesArray  // This is the array of movie objects
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