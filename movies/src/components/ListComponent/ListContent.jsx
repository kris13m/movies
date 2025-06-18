import { Link } from "react-router-dom";
import styles from "./ListList.module.css"; 


function ListContent({ listData, onRemoveMovie, isRemovingMovie }) {
  return (
    <>
      <h2 className={styles['list-title']}>{listData.list.name}</h2>

      {listData.movies.length === 0 ? (
        <p className={styles['empty-state']}>This list has no movies yet.</p>
      ) : (
        listData.movies.map((movie) => (
          <div key={movie.movie_id} className={styles['list-item']}>
            <Link to={`/movies/${movie.movie_id}`} className={styles['list-link']}>
              {movie.title}
            </Link>
            <button
              onClick={() => onRemoveMovie(movie.movie_id)}
              disabled={isRemovingMovie}
              className={styles['remove-movie-button']}
            >
              {isRemovingMovie ? "Removing..." : "Remove"}
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default ListContent;