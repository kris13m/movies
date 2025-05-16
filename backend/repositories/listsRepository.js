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


module.exports = { getListsByUserId, createList, getMoviesByListId };