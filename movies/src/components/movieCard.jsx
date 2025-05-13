import React from 'react';
import './movie.css';


function MovieCard({ movie }) {
    if (!movie) {
        return <div className="movie-card">No movie data available.</div>;
    }

    return (
        <a href = "https://google.com" style={{ color: 'inherit', textDecoration: 'none' }}>
        <div className="movie-card">
            <div>
            <h2>{movie.title || "Untitled Movie"}</h2>
            <img src={movie.backdrop_path} alt={movie.title} />
            <p>"{movie.tagline}"</p>
            <p>Released: {movie.release_date || "Unknown"}</p>
            </div>
        </div>
        </a>
    )
}

export default MovieCard;