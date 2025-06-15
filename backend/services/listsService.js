const listsRepository = require('../repositories/listsRepository');


async function getListsByUserId(id) {
  return await listsRepository.getListsByUserId(id);
}

async function createList(userId, name) {
  return await listsRepository.createList(userId, name);
}

async function getMoviesByListId(id) {
  return await listsRepository.getMoviesByListId(id);
}

async function addMovieToList(listId, movieId) {
  return await listsRepository.addMovieToList(listId, movieId);
}

async function deleteMovieFromList(listId, movieId) {
  return await listsRepository.deleteMovieFromList(listId, movieId);
}

function deleteList(id) {
  return listsRepository.deleteList(id);
}

module.exports = {getListsByUserId, createList, getMoviesByListId, addMovieToList, deleteMovieFromList, deleteList};