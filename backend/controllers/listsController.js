listsService = require('../services/listsService');
const { UniqueConstraintError } = require('sequelize');

async function getListsByUserId(req, res){
    if (!req.user) {
      return res.status(401).json({ message: 'User not found in request' });
    }

    const id = req.user.userId;

    try {
      const result = await listsService.getListsByUserId(id);
      res.json(result);
    } catch (error) {
      console.error('Error fetching lists:', error);
      res.status(500).json({ message: 'Server error' });
    }
}

async function createList(req, res) {
  try {
    const id = req.user.userId || req.user.id;
    const name = req.body.name;

    const result = await listsService.createList(id, name);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: 'List name already exists for this user.' });
    }

    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getMoviesByListId(req, res) {
  try {
    const { id } = req.params;
    const result = await listsService.getMoviesByListId(id);
    res.json(result);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addMovieToList(req, res){
    try {
        const movieId = req.body.movieId;
        const listId = req.params.id;

      const result = await listsService.addMovieToList(listId, movieId);
      res.json(result);
    } catch (error) {
      console.error('Error adding movie to list:', error);
      res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {getListsByUserId, createList, getMoviesByListId, addMovieToList};