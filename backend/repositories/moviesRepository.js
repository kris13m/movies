const db = require('../config/sequelizeInstance');  // Import the database connection
const { Movie, Genre } = require('../models');

async function findById(id) {
    try {
        // Ensure you're using promise-based queries
        const [rows] = await db.query('SELECT * FROM movies WHERE movie_id = ?', [id]);

        if (rows.length === 0) {
            throw new Error('Movie not found');
        }

        return rows[0];  // Return the first movie object
    } catch (error) {
        console.error('Error in findById:', error);
        throw error;  // Re-throw the error to handle it in the service/controller
    }
}



async function getAllMovies() {
  return Movie.findAll({
    include: Genre
  });
};

module.exports = {
    findById,
    getAllMovies
};