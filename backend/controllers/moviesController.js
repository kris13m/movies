moviesService = require('../services/moviesService');

async function getMovieById(req, res) {
    try {
        const { id } = req.params;
        const result = await moviesService.getMovieById(id);
        res.json(result); 
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function getAllMovies(req, res) { 
    try {
        const movies = await moviesService.getAllMovies();
        res.json(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = { getMovieById,
                   getAllMovies
};