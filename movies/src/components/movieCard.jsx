import './movie.css';
import { Link } from 'react-router-dom';


function MovieCard({ movie }) {
    if (!movie) {
        return <div className="movie-card">No movie data available.</div>;
    }

    return (
        <Link to={`/movies/${movie.movie_id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <div className="movie-card">
            <div>
            <h2 className="title">{movie.title || "Untitled Movie"}</h2>
            <img src={movie.backdrop_path} alt={movie.title} />
            <p>"{movie.tagline}"</p>
            <p className='rls'>Released: {movie.release_date || "Unknown"}</p>
            </div>
        </div>
        </Link>
    )
}

export default MovieCard;