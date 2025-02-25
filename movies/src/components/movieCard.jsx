import React from 'react';

function MovieCard({movie}) {

    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p>released: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p><b>review score: {movie.vote_average}/10</b></p>
            <p><b>reviewers: {movie.vote_count}</b></p>
            <hr></hr>
        </div>
    );
}

export default MovieCard;