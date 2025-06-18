import './SearchBar.css'; 

function SearchBar({ value, onChange, placeholder, ...props }) {
  return (
    <div className="searchbar-wrapper">
      <label htmlFor="search-input" className="searchbar-label">Search:</label>
      <input
        id="search-input"
        type="search"
        className="shared-searchbar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder || "Search for a movie..."}
        {...props}
      />
    </div>
  );
}

export default SearchBar;