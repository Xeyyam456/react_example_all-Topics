import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../../services/MovieService';
import { useWatchlist } from '../../context/WatchlistContext';
import styles from './movieModal.module.css';

const FALLBACK = 'https://placehold.co/200x300/16213e/888?text=No+Poster';

function MovieModal({ imdbID, year, onClose }) {
  const [movie, setMovie]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const { isInWatchlist, addMovie, removeMovie } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    setError(null);
    MovieService.getById(imdbID)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [imdbID]);

  const inWatchlist = movie ? isInWatchlist(movie.imdbID) : false;

  function toggleWatchlist() {
    inWatchlist ? removeMovie(movie.imdbID) : addMovie(movie);
  }

  return (
    // Clicking the dark overlay closes the modal
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {loading && <p className={styles.status}>Yüklənir...</p>}
        {error   && <p className={styles.error}>{error}</p>}

        {movie && (
          <div className={styles.content}>
            {/* ── Poster ── */}
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK}
              alt={movie.Title}
              className={styles.poster}
            />

            {/* ── Details ── */}
            <div className={styles.info}>
              <h2 className={styles.title}>{movie.Title}</h2>

              <div className={styles.badges}>
                <span className={styles.badge}>{movie.Year}</span>
                <span className={styles.badge}>{movie.Runtime}</span>
                <span className={styles.badge}>⭐ {movie.imdbRating}</span>
                {movie.Rated !== 'N/A' && (
                  <span className={styles.badge}>{movie.Rated}</span>
                )}
              </div>

              <p className={styles.genre}>{movie.Genre}</p>
              <p className={styles.plot}>{movie.Plot}</p>
              <p className={styles.meta}><b>Director:</b> {movie.Director}</p>
              <p className={styles.meta}><b>Cast:</b> {movie.Actors}</p>

              {/* ── Actions ── */}
              <div className={styles.actions}>
                <button
                  className={`${styles.watchlistBtn} ${inWatchlist ? styles.added : ''}`}
                  onClick={toggleWatchlist}
                >
                  {inWatchlist ? '❤️ Remove' : '🤍 Add to Watchlist'}
                </button>

                <Link
                  to={`/movies/${year}/${imdbID}`}
                  className={styles.detailLink}
                  onClick={onClose}
                >
                  📄 Full Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
