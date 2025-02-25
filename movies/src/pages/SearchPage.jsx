import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const searchMovies = async () => {
        if (!query) {
            alert('Please enter a movie name.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: apiKey,
                    query: query,
                    language: 'en-US',
                },
            });

            setMovies(response.data.results);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Movie Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter movie name"
            />
            <button onClick={searchMovies}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <li key={movie.id}>
                            {movie.title} ({movie.release_date})
                        </li>
                    ))
                ) : (
                    <li>No results found.</li>
                )}
            </ul>
        </div>
    );
}

export default SearchPage;