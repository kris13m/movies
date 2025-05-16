const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');
const authValidate = require('../middleware/authMiddleware');

router.get('/', authValidate, listsController.getListsByUserId); // get all lists from user
router.get('/:id', authValidate, listsController.getMoviesByListId); // get all movies from list
router.post('/', authValidate, listsController.createList); // create list
router.post('/:id/movies', authValidate, listsController.addMovieToList); // add movie to list

module.exports = router;