import ListSelector from "./ListSelector";
import { useEffect, useState } from "react";
import CreateList from "./CreateList";
import { useList } from "../../hooks/lists/useList";
import { Link } from "react-router-dom";
import { useDeleteMovieFromList } from "../../hooks/lists/useDeleteMovieFromList";
import "./ListList.css";

function ListList() {
    const [listId, setListId] = useState(null);
    const { data, isLoading, error } = useList(listId);
    const deleteMovieMutation = useDeleteMovieFromList();

    useEffect(() => {
        console.log(data);
    }, [listId]);

    const handleDelete = (movieId) => {
    if (listId && movieId) {
      deleteMovieMutation.mutate({ listId, movieId });
    }
  };


    return (
    <div>
      <CreateList />
      <h1>Your Lists</h1>
      <ListSelector setListId={setListId} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading list.</p>}

      {data?.map((movie) => (
        <div key={movie.movie_id} className="list-item">
          <Link to={`/movies/${movie.movie_id}`} className="list-link">
            {movie.title}
          </Link>
          <button
            onClick={() => handleDelete(movie.movie_id)}
            disabled={deleteMovieMutation.isPending}
            className="delete-button"
          >
            {deleteMovieMutation.isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListList;