import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce"; // Adjust path as needed

function SearchBar({ search, setSearch }) {
  // State for the input field's immediate value
  const [inputValue, setInputValue] = useState(search);
  
  // Get the debounced value from our custom hook
  const debouncedSearchTerm = useDebounce(inputValue, 400);

 
  useEffect(() => {
   
    if (debouncedSearchTerm !== search) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearch, search]);

  return (
    <div className="search-bar">
      <label>Search:</label>
      <input
        type="text"
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a movie..."
      />
    </div>
  );
}

export default SearchBar;