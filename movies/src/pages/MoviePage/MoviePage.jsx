import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/movies/useMovie';
import './MoviePage.css';
import ListSelector from '../../components/ListComponent/ListSelector';
import { useState } from 'react';


function MoviePage() {
  const [listId, setListId] = useState(null);

    const { id } = useParams(); // grabs the ":id" from the URL
    const { data: movie, isLoading, error } = useMovie(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie.</p>;
    if (!movie) return <p>No movie found.</p>;

    

    

    return (
        <div>
            <h1>{movie.title}</h1>
            <h3>genres</h3>
             <ul>
        {movie.Genres.map((genre) => (
          <li key={genre.genre_id}>{genre.genre}</li>  // Use genre_id as the unique key
        ))}
      </ul>
        <div>

        </div>
        <ListSelector setListId={setListId} />
        </div>
    )
}

export default MoviePage;