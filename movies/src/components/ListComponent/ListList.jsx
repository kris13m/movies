import ListSelector from "./ListSelector";
import { useEffect, useState } from "react";
import CreateList from "./CreateList";

function ListList() {
    const [listId, setListId] = useState(null);

    useEffect(() => {
        
    }, [listId]);

    return (
        <div>
            <CreateList />
            <h1>Your Lists</h1>
            <ListSelector setListId={setListId} />
            <h1>{listId}</h1>

            
            
        </div>
    );
}

export default ListList;