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

async function deleteList(listId, userId) {
  const deletedRowCount = await listsRepository.deleteListById(listId, userId);

  if (deletedRowCount === 0) {
    throw new Error("Authorization failed or list not found.");
  }

  return { message: "List deleted successfully." };
}

module.exports = {getListsByUserId, createList, getMoviesByListId, addMovieToList, deleteMovieFromList, deleteList};