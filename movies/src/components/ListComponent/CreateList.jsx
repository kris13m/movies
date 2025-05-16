import { useCreateList} from "../../hooks/lists/useCreateList"

function CreateList(){

    const { mutate, isLoading, error } = useCreateList();

    const handleSubmit = (e) => {
    e.preventDefault();

    const newListData = {
      name: e.target.elements.listName.value, // grab input value by name
    };
    mutate(newListData);
  };

    return(
        <div>
            <form onSubmit = {handleSubmit}>
            <input type="text" name="listName" placeholder = "create a new list" required></input>
            <button type="submit" disabled = {isLoading} >create new list</button>
            </form>
        </div>
    )
}

export default CreateList;