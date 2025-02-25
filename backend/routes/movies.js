const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

const cache = new NodeCache({ stdTTL: 600 }); // cache med levetid på 10 minutter

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const thisLimit = parseInt(req.query.limit) || 5;
        const minVote = parseFloat(req.query.minVote) || 0; 
        const maxVote = parseFloat(req.query.maxVote) || 10; 
        const sort = req.query.sort === 'desc' ? 'desc' : 'asc'; 

        const cacheKey = `movies_page_${page}_limit_${thisLimit}_minVote_${minVote}_maxVote_${maxVote}_sort_${sort}`;

        const cachedData = cache.get(cacheKey);

        if(cachedData) {
            console.log("accessing cached data!");
            return res.json(cachedData);
        }


        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: { api_key: process.env.API_KEY, limit: 20 }
        });

        let movies = response.data.results;

        // filtrer efter vote_average range
        movies = movies.filter(movie =>
            movie.vote_average >= minVote && movie.vote_average <= maxVote
        );

        // sorter efter average_vote
        movies.sort((a, b) =>
            sort === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average
        );

        // 3. Pagination
        const startIndex = (page - 1) * thisLimit;
        const paginatedMovies = movies.slice(startIndex, startIndex + thisLimit);

        const result = {
            page,
            totalResults: movies.length,
            totalPages: Math.ceil(movies.length / thisLimit),
            movies: paginatedMovies
        };

        cache.set(cacheKey, result); // lav en ny cache

        res.json(result);

    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});



module.exports = router;
