const movieRepository = require('../repositories/moviesRepository');
const { Op } = require('sequelize');
const he = require('he');
const { isValid, parse, format } = require('date-fns')

async function getMovieById(id) {
    if (!id || isNaN(parseInt(id))) {
        throw new Error('Invalid movie ID');
    }

    const movie = await movieRepository.findById(id);

    if (!movie) {
        throw new Error('Movie not found');
    }

    return movie;
}

async function getAllMovies(queryParams) {
    let page = parseInt(queryParams.page, 10) || 1;
    let limit = parseInt(queryParams.limit, 10) || 24;
    const offset = (page - 1) * limit;

    const where = {};
        //handle genre filtering
        if (queryParams.genre) {
          where.Genres = {
            [Op.overlap]: Array.isArray(queryParams.genre)
              ? queryParams.genre
              : [queryParams.genre],
          };
        }

      // Handle title filtering (using a case-insensitive like)
      if (queryParams.title) {
        where.title = {
          [Op.like]: `%${queryParams.title}%`, // Changed from Op.iLike to Op.like
        };
      }

      // Handle release_date filtering.  Allow year, or full date
      if (queryParams.release_date) {
        where.release_date = {
          [Op.like]: `${queryParams.release_date}%`,
        };
      }

    const order = [];
if (queryParams.sortBy) {
    const allowedSortFields = ['title', 'release_date']; // Add more fields as needed
    if (allowedSortFields.includes(queryParams.sortBy)) {
        const sortOrder = (queryParams.sortOrder ?? 'asc').trim().toUpperCase() || 'ASC';
        order.push([queryParams.sortBy, sortOrder]);
    }
} else {
    order.push(['title', 'ASC']); // Default sort order
}

    const options = {
        limit: limit,
        offset: offset,
        where: where,
        order: order
    };

    const result = await movieRepository.getAllMovies(options);

    return {
        movies: result.rows,
        pagination: {
            totalItems: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
            pageSize: limit
        }
    };
}

module.exports = {
    getMovieById,
    getAllMovies
};