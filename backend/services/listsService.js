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

module.exports = {getListsByUserId, createList, getMoviesByListId};