import { useMovies } from "../../hooks/movies/useMovies";
import Card from "../MovieCard/movieCard";
import SortList from "./SortList";
import SearchBar from './SearchBar'
import { useState, useEffect } from "react";
import './MovieList.css'
import PageButtons from "./PageButtons";

const MovieList = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useMovies({ page: page, title: search, sortBy: sort, sortOrder: order });
  const movies = data?.movies;

  useEffect(() => {
  setPage(1);
}, [search, sort]);



  return (
    <>
      <div className = "params">
        <SearchBar search={search} setSearch={setSearch} />
        <SortList sort={sort} setSort={setSort} order={order} setOrder={setOrder} />
      </div>

      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error loading movies: {error.message}</p>}

      <div className="cards-list">
        {movies?.map((movie) => (
          <Card key={movie.movie_id} movie={movie} />
        ))}
      </div>
      <div>
        <PageButtons page={page} setPage={setPage} totalPages={data?.pagination.totalPages}></PageButtons>
      </div>
    </>
  );
};

export default MovieList;