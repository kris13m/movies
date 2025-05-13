import { useRef } from "react";

function SearchBar({ search, setSearch }) {
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;

    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    
    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 400); // debounce timer
  };

  return (
    <div className="search-bar">
      <label>Search:</label>
      <input
        type="text"
        defaultValue={search}
        onChange={handleChange}
        placeholder="Search for a movie..."
      />
    </div>
  );
}

export default SearchBar;