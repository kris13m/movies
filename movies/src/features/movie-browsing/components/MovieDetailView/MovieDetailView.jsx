

// --- We've moved all the logic here ---
import { useState } from 'react';
import { useMovie } from '../../hooks/useMovie';
import { useAddMovieToList } from '../../../user/hooks/useAddMovieToList';

// We import the smart component for selecting a list
import ListSelector from '../../../user/components/ListSelector'; // EEEEE

// Note: I'm assuming the CSS file is moved here too.
import styles from './MoviePage.module.css';
import Button from '../../../../components/ui/Button/Button';


// The component now takes the movie ID as a prop, instead of getting it from the URL.
function MovieDetailView({ movieId }) {
      console.log("MovieDetailView received prop movieId:", movieId);

    const { data: movie, isLoading, error } = useMovie(movieId);
    const [listId, setListId] = useState('');
    const mutation = useAddMovieToList();

     const handleAddToList = () => {
        // The guard clause is still correct.
        if (!listId || mutation.isPending) return;

        // --- THE FIX IS HERE ---
        // We now build the exact object that the useAddMovieToList hook expects.
        const mutationPayload = {
            id: listId, // The hook expects the key to be 'id'
            params: {
                movieId: movieId // The hook expects the movie ID inside a 'params' object
            }
        };

        // Log the new payload to confirm it's correct
        console.log("SENDING CORRECTLY FORMATTED PAYLOAD:", mutationPayload);

        // Call mutate with the correctly formatted object
        mutation.mutate(mutationPayload);
    };
    
    if (isLoading) return <div className={styles['page-status']}>Loading movie...</div>;
    if (error) return <div className={`${styles['page-status']} ${styles.error}`}>Error: {error.message}</div>;
    if (!movie) return <div className={styles['page-status']}>No movie found.</div>;

    // The JSX is almost identical, but uses our shared Button component for consistency
    return (
        <div className={styles['movie-page-container']}>
            <div className={styles['movie-layout-grid']}> 
                <div className={styles['movie-title']}>{movie.title}</div>
                {movie.tagline && <div className={styles['movie-tagline']}>{movie.tagline}</div>}
                {movie.Genres?.length > 0 && (
                    <div className={styles['movie-genres']}>
                        {movie.Genres.map((g) => <span key={g.genre_id} className={styles['genre-pill']}>{g.genre}</span>)}
                    </div>
                )}
                <div className={styles['movie-image']} style={{ backgroundImage: `url(${movie.backdrop_path})` }} />
                <div className={styles['movie-overview']}>
                    <p><b>Overview:</b> {movie.overview || "No overview available."}</p>
                </div>
                <div className={styles['movie-footer']}>
                    <div className={styles['movie-info']}>
                        {movie.release_date && <span>Release Date: {movie.release_date}</span>}
                        {movie.original_language && <span>Language: {movie.original_language.toUpperCase()}</span>}
                    </div>
                    <div className={styles['add-to-list']}>
                        <ListSelector listId={listId} setListId={setListId} />
                        <Button
                            onClick={handleAddToList}
                            disabled={!listId || mutation.isPending}
                            className={styles['add-button']}
                        >
                            {mutation.isPending ? 'Adding...' : 'Add'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailView;



/*import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/movies/useMovie';
import './MoviePage.css';
import ListSelector from '../../components/ListComponent/ListSelector';
import { useState } from 'react';
import { useAddMovieToList } from '../../hooks/lists/useAddMovieToList';



function MoviePage() {
  const [listId, setListId] = useState(null);

    const { id } = useParams(); // grabs the ":id" from the URL
    const { data: movie, isLoading, error } = useMovie(id);

     const mutation = useAddMovieToList();
   

    const handlePost = () => {
      if (!listId) return;

      mutation.mutate({ id: listId, params: { movieId: id } }); 
    };
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie.</p>;
    if (!movie) return <p>No movie found.</p>;

  
    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={movie.backdrop_path} alt={movie.title} />
            <h3>genres</h3>
             <ul>
        {movie.Genres.map((genre) => (
          <li key={genre.genre_id}>{genre.genre}</li>  // Use genre_id as the unique key
        ))}
      </ul>
        <div>

        </div>
        <ListSelector setListId={setListId} />
        <button onClick={handlePost}>Add to List</button>
        </div>
    )
}

export default MoviePage;

*/

/*
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMovie } from '../../hooks/movies/useMovie';
import { useAddMovieToList } from '../../hooks/lists/useAddMovieToList';
import ListSelector from '../../components/ListComponent/ListSelector';
// Corrected import
import styles from './MoviePage.module.css';

function MoviePage() {
    const { id } = useParams();
    const { data: movie, isLoading, error } = useMovie(id);
    const [listId, setListId] = useState(null);
    const mutation = useAddMovieToList();

    const handleAddToList = () => {
        if (!listId || mutation.isLoading) return;
        mutation.mutate({ id: listId, params: { movieId: id } });
    };

    if (isLoading) return <div className={styles.pageStatus}>Loading movie...</div>;
    if (error) return <div className={`${styles.pageStatus} ${styles.error}`}>Error: {error.message}</div>;
    if (!movie) return <div className={styles.pageStatus}>No movie found.</div>;

    // A helper to combine multiple classes from your CSS module
    const cx = (...classNames) => classNames.filter(Boolean).join(' ');

     console.log("My CSS styles object:", styles);

    return (
        <div className={styles.moviePageContainer}>
         
            <div className={styles.movieCard}>

                <div className={styles.movieTitle}>{movie.title}</div>

                {movie.tagline && (
                    <div className={styles.movieTagline}>{movie.tagline}</div>
                )}

                {movie.Genres && movie.Genres.length > 0 && (
                    <div className={styles.movieGenres}>
                        {movie.Genres.map((genre) => (
                            <span key={genre.genre_id} className={styles.genrePill}>
                                {genre.genre}
                            </span>
                        ))}
                    </div>
                )}

                <div
                    className={styles.movieImage}
                    style={{ backgroundImage: `url(${movie.backdrop_path})` }}
                >
                 
                  <div className={styles.imageOverlay}></div>
                </div>

                <div className={styles.movieOverview}>
                    <p><b>Overview:</b> {movie.overview || "No overview available."}</p>
                </div>

                <div className={styles.movieFooter}>
                    <div className={styles.movieInfo}>
                        {movie.release_date && <span>Release Date: {movie.release_date}</span>}
                        {movie.original_language && <span>Language: {movie.original_language.toUpperCase()}</span>}
                    </div>
                    <div className={styles.addToList}>
                        <ListSelector setListId={setListId} />
                        <button
                            className={styles.addButton}
                            onClick={handleAddToList}
                            disabled={!listId || mutation.isLoading}
                        >
                            {mutation.isLoading ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;

*/

