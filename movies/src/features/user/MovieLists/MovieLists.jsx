import { useState } from "react";

import CreateList from "../components/CreateList/CreateList.jsx";
import ListContent from "../components/ListContent.jsx"; 
import ListSelector from "../components/ListSelector.jsx";

import { useList } from "../hooks/useList";
import { useDeleteMovieFromList } from "../hooks/useDeleteMovieFromList";
import { useDeleteList } from "../hooks/useDeleteList";

import styles from "./ListList.module.css";

function MovieLists() {
  const [listId, setListId] = useState(null);
  const { data: listData, isLoading, isError } = useList(listId);
  
  const deleteMovieMutation = useDeleteMovieFromList();
  
  const deleteListMutation = useDeleteList();

  const handleRemoveMovie = (movieId) => {
    if (listId && movieId) {
      deleteMovieMutation.mutate({ listId, movieId });
    }
  };

 const handleDeleteList = () => {
  if (!listId) return;

  const listName = listData?.list?.name || "the selected list";
  if (window.confirm(`Are you sure you want to permanently delete "${listName}"?`)) {
    deleteListMutation.mutate({ listId });
    setListId(null);
  }
};

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

export default MovieLists;

