const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const  authValidate  = require('../middleware/authMiddleware');

router.get('/:id', moviesController.getMovieById);
router.get('/', moviesController.getAllMovies)
//router.post('/', moviesController.createMovie);

module.exports = router;
