import React from 'react';
import './SearchBar.css'; // Let's give it its own CSS file for styling

/**
 * A dumb, reusable, and controlled SearchBar component.
 * It receives its value and an onChange handler from the parent.
 * It has no internal state or logic.
 */
function SearchBar({ value, onChange, placeholder, ...props }) {
  return (
    <div className="searchbar-wrapper">
      <label htmlFor="search-input" className="searchbar-label">Search:</label>
      <input
        id="search-input"
        type="search"
        className="shared-searchbar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Simply pass the new value up to the parent
        placeholder={placeholder || "Search for a movie..."}
        {...props}
      />
    </div>
  );
}

export default SearchBar;