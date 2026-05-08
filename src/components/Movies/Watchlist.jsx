import { Link } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import styles from './watchlist.module.css';

const FALLBACK = 'https://placehold.co/80x120/16213e/888?text=?';

function Watchlist() {
  const { watchlist, removeMovie } = useWatchlist();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>❤️ My Watchlist</h2>

      {watchlist.length === 0 ? (
        /* ── Empty state ── */
        <div className={styles.empty}>
          <p>Watchlist-iniz boşdur.</p>
          <Link to='/movies/2024' className={styles.browseLink}>
            Filmlərə bax →
          </Link>
        </div>
      ) : (
        /* ── Movie list ── */
        <ul className={styles.list}>
          {watchlist.map((movie) => (
            <li key={movie.imdbID} className={styles.item}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK}
                alt={movie.Title}
                className={styles.poster}
              />
              <div className={styles.info}>
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.year}>{movie.Year}</p>
                <Link
                  to={`/movies/${movie.Year}/${movie.imdbID}`}
                  className={styles.detailLink}
                >
                  Ətraflı →
                </Link>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeMovie(movie.imdbID)}
              >
                ✕ Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
