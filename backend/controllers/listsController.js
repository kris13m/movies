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
    const id =  req.user.id;
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

    if (!result) {
      return res.status(404).json({ message: 'List not found' });
    }

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

async function deleteMovieFromList(req, res) {
  console.log("here");
  try {
    const movieId = req.params.movieId;
    const listId = req.params.id;

    const result = await listsService.deleteMovieFromList(listId, movieId);

    if (result === 0) {
      return res.status(404).json({ message: 'Movie not found in list' });
    }

    res.status(204).send(); // 204 no content
  } catch (error) {
    console.error('Error deleting movie from list:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteList(req, res) {
  // --- START DEBUGGING LOGS ---
 
  try {
    const { id: listId } = req.params;
    const userId = req.user.userId; // Assuming the JWT payload key is 'userId'

    console.log(`Controller: Attempting to delete listId: ${listId} for userId: ${userId}`);
    
    // Check if userId is undefined. This is a common bug.
    if (!userId) {
      console.error("Controller ERROR: userId is undefined. Check JWT payload and req.user object.");
      return res.status(401).json({ message: 'Authentication error: User ID not found.' });
    }
    // --- END DEBUGGING LOGS ---

    await listsService.deleteList(listId, userId);
    res.status(204).send();

  } catch (error) {
    // Add a detailed log to the catch block
    console.error('--- CONTROLLER CATCH BLOCK ---');
    console.error('Full error object:', error);
    
    if (error.message.includes("Authorization failed")) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this list.' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {getListsByUserId, createList, getMoviesByListId, addMovieToList, deleteMovieFromList, deleteList};