import ListSelector from "./ListSelector";
import { useEffect, useState } from "react";
import CreateList from "./CreateList";
import { useList } from "../../hooks/lists/useList";
import { Link } from "react-router-dom";

function ListList() {
    const [listId, setListId] = useState(null);
    const { data, isLoading, error } = useList(listId);

    useEffect(() => {
        console.log(data);
    }, [listId]);

    return (
        <div>
            <CreateList />
            <h1>Your Lists</h1>
            <ListSelector setListId={setListId} />
            <h1>{listId}</h1>
            {data?.map((list) => (
                <Link to={`/movies/${list.movie_id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <div key={list.movie_id}>{list.title}</div>
                </Link>
            ))}

            
            
        </div>
    );
}

export default ListList;