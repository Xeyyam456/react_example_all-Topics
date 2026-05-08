import { useWatchlist } from '../../context/WatchlistContext';
import styles from './movieCard.module.css';

const FALLBACK = 'https://placehold.co/300x445/16213e/888?text=No+Poster';

function MovieCard({ movie, onClick }) {
  const { isInWatchlist, addMovie, removeMovie } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.imdbID);

  function toggleWatchlist(e) {
    e.stopPropagation();
    inWatchlist ? removeMovie(movie.imdbID) : addMovie(movie);
  }

  return (
    <div className={styles.card} onClick={onClick}>
      {/* ── Poster ── */}
      <div className={styles.posterWrap}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK}
          alt={movie.Title}
          className={styles.poster}
        />
        <button
          className={`${styles.heartBtn} ${inWatchlist ? styles.hearted : ''}`}
          onClick={toggleWatchlist}
          title={inWatchlist ? 'Watchlist-dən çıxar' : 'Watchlist-ə əlavə et'}
        >
          {inWatchlist ? '❤️' : '🤍'}
        </button>
      </div>

      {/* ── Info ── */}
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
