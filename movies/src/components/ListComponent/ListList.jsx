import { useState } from "react";

// Component Imports
import ListSelector from "./ListSelector";
import CreateList from "./CreateList";
import ListContent from "./ListContent"; 

// Hook Imports
import { useList } from "../../hooks/lists/useList";
import { useDeleteMovieFromList } from "../../hooks/lists/useDeleteMovieFromList";
import { useDeleteList } from "../../hooks/lists/useDeleteList";

// Styles Import
import styles from "./ListList.module.css";

function ListList() {
  const [listId, setListId] = useState(null);
  const { data: listData, isLoading, isError } = useList(listId);
  
  const deleteMovieMutation = useDeleteMovieFromList();
  
  const deleteListMutation = useDeleteList({
    onSuccess: () => {
      // This is correct: it resets the view after a successful delete.
      setListId(null); 
    },
  });

  const handleRemoveMovie = (movieId) => {
    if (listId && movieId) {
      deleteMovieMutation.mutate({ listId, movieId });
    }
  };

  const handleDeleteList = () => {
    // Only guard against the missing ID.
    if (!listId) return;

    // Provide a fallback name. This prevents the silent failure bug.
    const listName = listData?.list?.name || "the selected list";
    
    if (window.confirm(`Are you sure you want to permanently delete "${listName}"?`)) {
      deleteListMutation.mutate({listId});
    }
  };
  // =====================================================================

  const renderContent = () => {
    if (isLoading) return <p>Loading list...</p>;
    if (isError) return <p>Error loading list. It may have been deleted.</p>;
    if (!listId || !listData) {
      return <p className={styles['empty-state']}>Select a list above to view its movies, or create a new one.</p>;
    }
    return (
      <ListContent 
        listData={listData} 
        onRemoveMovie={handleRemoveMovie} 
        isRemovingMovie={deleteMovieMutation.isPending} 
      />
    );
  };

  return (
    <div className={styles['list-page-container']}>
      <div className={styles['list-controls']}>
        <div className={styles['list-actions']}>
          <CreateList />
        </div>
        <div className={styles['list-selection']}>
          <ListSelector selectedListId={listId} setListId={setListId} />
          <button
            onClick={handleDeleteList}
            
            disabled={!listId || !listData || deleteListMutation.isPending}
           
            className={styles['delete-list-button']}
          >
            {deleteListMutation.isPending ? "Deleting..." : "Delete Selected List"}
          </button>
        </div>
      </div>
      
      <div className={styles['list-content-area']}>
        {renderContent()}
      </div>
    </div>
  );
}

export default ListList;



/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Component Imports
import ListSelector from "./ListSelector";
import CreateList from "./CreateList";

// Hook Imports
import { useList } from "../../hooks/lists/useList";
import { useDeleteMovieFromList } from "../../hooks/lists/useDeleteMovieFromList";
import { useDeleteList } from "../../hooks/lists/useDeleteList"; // <-- IMPORT THE NEW HOOK

// Styles Import
import styles from "./ListList.module.css";

function ListList() {
  const [listId, setListId] = useState(null);
  const { data: listData, isLoading, error } = useList(listId);
  
  const deleteMovieMutation = useDeleteMovieFromList();
  
  // 1. Instantiate the delete list mutation
  const deleteListMutation = useDeleteList({
    // 2. Add an onSuccess callback to clear the view after deletion
    onSuccess: () => {
      setListId(null); // This will hide the old list and show the empty state
    },
  });

  // Handler to remove a single movie from the current list
  const handleRemoveMovie = (movieId) => {
    if (listId && movieId) {
      deleteMovieMutation.mutate({ listId, movieId });
    }
  };

  // 3. Handler to delete the ENTIRE currently selected list
  const handleDeleteList = () => {
    if (!listId) return;

    // 4. Use window.confirm for safety, as this is a destructive action
    const listName = listData?.list?.name || "this list";
    if (window.confirm(`Are you sure you want to permanently delete "${listName}"?`)) {
      deleteListMutation.mutate(listId);
    }
  };

  return (
    <div className={styles['list-page-container']}>
      
      <div className={styles['list-controls']}>
        <div className={styles['list-actions']}>
          <CreateList />
        </div>
        <div className={styles['list-selection']}>
          <ListSelector setListId={setListId} />
          <button
            onClick={handleDeleteList}
            disabled={!listId || deleteListMutation.isPending}
            className={styles['delete-list-button']}
          >
            {deleteListMutation.isPending ? "Deleting..." : "Delete Selected List"}
          </button>
        </div>
      </div>

      
      <div className={styles['list-content-area']}>
        {isLoading && <p>Loading list...</p>}
        {error && <p>Error loading list.</p>}

       
        {listId && listData ? (
          <>
            <h2 className={styles['list-title']}>{listData?.list?.name}</h2>
            {listData.movies?.map((movie) => (
              <div key={movie.movie_id} className={styles['list-item']}>
                <Link to={`/movies/${movie.movie_id}`} className={styles['list-link']}>
                  {movie.title}
                </Link>
                <button
                  onClick={() => handleRemoveMovie(movie.movie_id)}
                  disabled={deleteMovieMutation.isPending}
                  className={styles['remove-movie-button']}
                >
                  {deleteMovieMutation.isPending ? "Removing..." : "Remove"}
                </button>
              </div>
            ))}
          </>
        ) : (
          // Show this empty state when no list is selected
          !isLoading && <p className={styles['empty-state']}>Select a list above to view its movies, or create a new one.</p>
        )}
      </div>
    </div>
  );
}

export default ListList;

*/


/*
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

*/