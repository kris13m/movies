const moviesRepository = require('../repositories/moviesRepository');

async function getMovieById(id) {
    if (!id || isNaN(parseInt(id))) {
        throw new Error('Invalid movie ID');
    }

    const movie = await moviesRepository.findById(id);

    if (!movie) {
        throw new Error('Movie not found');
    }

    return movie;
}

async function getAllMovies() {
    return moviesRepository.getAllMovies();
  };

module.exports = {
    getMovieById,
    getAllMovies
};