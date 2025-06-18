import './MovieList.css';
import { useState, useEffect } from "react";

// --- HOOKS ---
// NOTE: Adjust these paths based on your final feature-sliced folder structure.
import { useMovies } from '../../hooks/useMovies';
import useDebounce from "../../../../hooks/useDebounce";

// --- UI COMPONENTS ---
// NOTE: Adjust these paths to your new `components/ui/` directory.
import Card from "./MovieCard/movieCard"; // Or a generic `ui/Card/Card`
import SelectInput from '../../../../components/ui/SelectInput/SelectInput';
import SearchBar from '../../../../components/ui/SearchBar/SearchBar';
import Button from '../../../../components/ui/Button/Button';

// Configuration for the sort dropdown. Defining it outside the component
// prevents it from being recreated on every render.
const sortOptions = [
  { value: 'default', label: 'Sort by...' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const MovieList = () => {
  // --- STATE MANAGEMENT ---

  // State for the "live" user input in the search bar
  const [searchTerm, setSearchTerm] = useState('');
  // The debounced version of the search term, which is used for the API call
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // State for the user's selection in the sort dropdown
  const [sortValue, setSortValue] = useState('default');

  // State for the current pagination page
  const [page, setPage] = useState(1);

  // State for the actual API query parameters, derived from the simple `sortValue`
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('desc'); // Default order

  // --- DATA FETCHING ---
  const { data, isLoading, error } = useMovies({
    page,
    title: debouncedSearchTerm,
    sortBy: sort,
    sortOrder: order,
  });

  // Destructure data for cleaner access in JSX
  const movies = data?.movies;
  const totalPages = data?.pagination.totalPages;

  // --- SIDE EFFECTS (useEffect) ---

  // EFFECT 1: Translate the simple dropdown value into complex API parameters.
  // This is the core "business logic" for sorting.
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

  // EFFECT 2: Reset the page to 1 whenever the user changes their search or sort criteria.
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

      {/* Conditionally render pagination controls only if there is more than one page */}
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





/*
import './MovieList.css';
import { useMovies } from "../../hooks/movies/useMovies";
import useDebounce from "../../hooks/useDebounce"; 
import Card from "../MovieCard/movieCard";
import SortList from "./SortList";


import SearchBar from '../ui/SearchBar/SearchBar'; 
import Button from '../ui/Button/Button';

import { useState, useEffect } from "react";

const MovieList = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // 3. The debouncing logic now lives here.
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Other states remain the same
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // 4. The useMovies hook now consumes the DEBOUNCED search term.
  const { data, isLoading, error } = useMovies({ 
    page, 
    title: debouncedSearchTerm, // Use the debounced value for the API call
    sortBy: sort, 
    sortOrder: order 
  });
  const movies = data?.movies;
  const totalPages = data?.pagination.totalPages;

  // Reset the page number whenever the search or sort criteria change.
  // This now uses the debounced term to avoid resetting on every keystroke.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, sort, order]);

  return (
    <>
      <div className="params">
        
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm} // Pass the state setter directly
        />
        <SortList sort={sort} setSort={setSort} order={order} setOrder={setOrder} />
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
          <Button onClick={() => setPage(page - 1)} disabled={page === 1 || isLoading}>
            Previous
          </Button>
          <span className="pagination-info">Page {page} of {totalPages}</span>
          <Button onClick={() => setPage(page + 1)} disabled={page === totalPages || isLoading}>
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default MovieList;



*/


/*import './MovieList.css'
import { useMovies } from "../../hooks/movies/useMovies";
import Card from "../MovieCard/movieCard";
import SortList from "./SortList";
import SearchBar from './SearchBar'
import { useState, useEffect } from "react";
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
*/