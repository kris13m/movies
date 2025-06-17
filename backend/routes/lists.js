const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');
const authValidate = require('../middleware/authMiddleware');
const verifyCsrfTokenMiddleware = require('../middleware/verifyCsrfTokenMiddleware');

router.get('/', authValidate, listsController.getListsByUserId); // get all lists from user
router.get('/:id', authValidate, listsController.getMoviesByListId); // get all movies from list
router.post('/', authValidate, listsController.createList); // create list
router.post('/:id/movies', authValidate, verifyCsrfTokenMiddleware, listsController.addMovieToList); // add movie to list
router.delete('/:id/movies/:movieId',authValidate, listsController.deleteMovieFromList); // delete movie from list
router.delete('/:id', authValidate, listsController.deleteList); // delete list

module.exports = router;