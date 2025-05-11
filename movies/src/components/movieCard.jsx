import React from 'react';

function MovieCard({ movie }) {
    if (!movie) {
        return <div className="movie-card">No movie data available.</div>;
    }

    return (
        <div className="movie-card">
            <h2>{movie.title || "Untitled Movie"}</h2>
            <p>Released: {movie.release_date || "Unknown"}</p>
            {movie.poster_path ? (
                <img src={movie.poster_path} alt={movie.title || "Movie poster"} />
            ) : (
                <p>No poster available.</p>
            )}
            <p>{movie.tagline || "No tagline available."}</p>
            <p><b>Review score: {movie.vote_average ?? "N/A"}/10</b></p>
            <p><b>Reviewers: {movie.vote_count ?? "N/A"}</b></p>
            <hr />
        </div>
    );
}

export default MovieCard;