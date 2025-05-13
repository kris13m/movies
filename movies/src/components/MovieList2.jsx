import { useMovies } from "../hooks/useMovies";
import Card from "./movieCard";
import SearchBar from './SearchBar'
import { useState, useEffect } from "react";
import './movie.css';

const MovieList2 = () => {
  const x = 1;
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useMovies({ page: x, title: search });
  const movies = data?.movies;

  console.log(data);

  useEffect(() => {
    console.log("Search term updated:", search);
  }, [search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />

      {isLoading && <p>Loading movies test...</p>}
      {error && <p>Error loading movies test: {error.message}</p>}

      <div className="cards-list">
        {movies?.map((movie) => (
          <Card key={movie.movie_id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieList2;