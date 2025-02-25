import { useState, useEffect } from 'react';
import MovieCard from './movieCard';
import axios from 'axios';


function MovieList() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState([]);
   

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem("AuthoToken");

                const response = await axios.get(`http://localhost:3000/api/movies?page=${page}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setMovies(response.data.movies);  // Set movies to the fetched results
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();  // Call the fetch function when the page changes
    }, [page]);

    return (
        <>
            <div className="movie-list">
                {movies.map((movie) => (  // Properly destructure each movie object
                    <MovieCard key={movie.id} movie={movie} />  // Passing the movie prop correctly
                ))}
            </div>
            <button onClick={() => {setPage(page - 1); window.scrollTo({ top: 0 });}} disabled={page <= 1}>Previous Page</button>

            <button onClick={() => {setPage(page + 1); window.scrollTo({ top: 0 });}} disabled ={page == totalPages}>Next Page</button>
            <p>Page {page}</p>
        </>
    );
}

export default MovieList;