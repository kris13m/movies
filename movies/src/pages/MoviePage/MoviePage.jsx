// src/pages/MoviePage/MoviePage.jsx

import { useParams } from 'react-router-dom';
import MovieDetailView from '../../features/movie-browsing/components/MovieDetailView/MovieDetailView';

function MoviePage() {
  const { id } = useParams();

  return (
    <MovieDetailView movieId={id} />
  );
}

export default MoviePage;