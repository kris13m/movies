import './MovieList.css';
import { useState, useEffect } from "react";


import { useMovies } from '../../hooks/useMovies';
import useDebounce from "../../../../hooks/useDebounce";


import Card from "./MovieCard/movieCard"; 
import SelectInput from '../../../../components/ui/SelectInput/SelectInput';
import SearchBar from '../../../../components/ui/SearchBar/SearchBar';
import Button from '../../../../components/ui/Button/Button';


const sortOptions = [
  { value: 'default', label: 'Sort by...' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const MovieList = () => {
// STATE MANAGEMENT


  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 400);


  const [sortValue, setSortValue] = useState('default');

  const [page, setPage] = useState(1);


  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('desc'); 


  const { data, isLoading, error } = useMovies({
    page,
    title: debouncedSearchTerm,
    sortBy: sort,
    sortOrder: order,
  });


  const movies = data?.movies;
  const totalPages = data?.pagination.totalPages;

  
  useEffect(() => {
    if (sortValue === 'newest') {
      setSort('release_date');
      setOrder('desc');
    } else if (sortValue === 'oldest') {
      setSort('release_date');
      setOrder('asc');
    } else {
      // Reset to default if 'Sort by...' is selected
      setSort('');
      setOrder('desc');
    }
  }, [sortValue]); // Reruns only when the dropdown selection changes

 
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, sort, order]); // Reruns when the actual API query params change

  // --- RENDER ---
  return (
    <>
      <div className="params">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for movies..."
        />
        <SelectInput
          label="Sort:"
          options={sortOptions}
          value={sortValue}
          onChange={setSortValue}
        />
      </div>

      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error loading movies: {error.message}</p>}

      <div className="cards-list">
        {movies?.map((movie) => (
          <Card key={movie.movie_id} movie={movie} />
        ))}
      </div>

     
      {totalPages > 1 && (
        <div className="pagination-controls">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || isLoading}
          >
            Previous
          </Button>

          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>

          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default MovieList;