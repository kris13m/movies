const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const  authValidate  = require('../middleware/authMiddleware');
const verifyCsrfTokenMiddleware = require('../middleware/verifyCsrfTokenMiddleware');

router.get('/:id',authValidate, moviesController.getMovieById); // movie by ID
router.get('/', verifyCsrfTokenMiddleware, moviesController.getAllMovies) // all movies

module.exports = router;
