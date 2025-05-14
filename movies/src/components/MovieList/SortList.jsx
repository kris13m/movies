

function SortList({ sort, setSort, order, setOrder }) {
  const handleChange = (event) => {
   
    const value = event.target.value;

    if (value === 'oldest') {
      setOrder('asc'); // 'oldest' is ascending order
      setSort('release_date'); // Sort by release date
    } else if (value === 'newest') {
      setOrder('desc'); // 'newest' is descending order
      setSort('release_date'); // Sort by release date
    } else {
      setSort(''); // Reset sort
      setOrder(''); // Reset order
    }
  };

  return (
    <div>
      <label>Sort:</label>
      <select id="sort" onChange={handleChange}>
        <option value="">Select Sort Option</option>
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default SortList;