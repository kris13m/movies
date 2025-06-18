
import { useLists } from '../hooks/useLists';

function ListSelector({setListId} ) {
  const { data = [] } = useLists();

  const handleChange = (event) => {
    const selectedListId = event.target.value;
    setListId(selectedListId);
  };

  return (
    <div>
      <select id="sort" onChange={handleChange}>
        <option value="">Select a list</option>
        {data.map((list) => (
          <option key={list.list_id} value={list.list_id}>
            {list.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListSelector;

