const listsRepository = require('../repositories/listsRepository');


function getListsByUserId(id){
    return listsRepository.getListsByUserId(id);
}

function createList(userId, name) {
  return listsRepository.createList(userId, name);
}

function getMoviesByListId(id) {
  return listsRepository.getMoviesByListId(id);
}

function addMovieToList(listId, movieId) {
  return listsRepository.addMovieToList(listId, movieId);
}

module.exports = {getListsByUserId, createList, getMoviesByListId, addMovieToList};