const db = require('../config/sequelizeInstance');  // Import the database connection
const { Movie, Genre } = require('../models');

async function findById(id) {
        return Movie.findByPk(id,{
  include: [{
    model: Genre,
    attributes: ['genre_id', 'genre'],
    through: {
      attributes: [] 
    }
  }]
});
}

async function getAllMovies(options) {
    const { limit, offset, where, order } = options;
    return Movie.findAndCountAll({
        where: where,
        include: [{
            model: Genre,
            attributes: ['genre_id', 'genre'],
            through: { attributes: [] }  // Exclude join table attributes
        }],
        limit: limit,
        offset: offset,
        order: order
    });
}

module.exports = {
    findById,
    getAllMovies
};