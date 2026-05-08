import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieService from '../../services/MovieService';
import { useWatchlist } from '../../context/WatchlistContext';
import styles from './movieDetail.module.css';

const FALLBACK = 'https://placehold.co/280x420/16213e/888?text=No+Poster';

function MovieDetail() {
  const { id, year } = useParams();
  const navigate     = useNavigate();

  const [movie, setMovie]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const { isInWatchlist, addMovie, removeMovie } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    MovieService.getById(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.status}>Yüklənir...</p>;
  if (error)   return <p className={styles.error}>{error}</p>;

  const inWatchlist = isInWatchlist(movie.imdbID);

  return (
    <div className={styles.wrapper}>
      {/* ── Back button ── */}
      <button className={styles.back} onClick={() => navigate(`/movies/${year}`)}>
        ← {year} filmlərə qayıt
      </button>

      <div className={styles.content}>
        {/* ── Poster ── */}
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK}
          alt={movie.Title}
          className={styles.poster}
        />

        {/* ── Info ── */}
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.Title}</h1>

          <div className={styles.badges}>
            <span className={styles.badge}>{movie.Year}</span>
            <span className={styles.badge}>{movie.Runtime}</span>
            <span className={styles.badge}>⭐ {movie.imdbRating}</span>
            <span className={styles.badge}>🗳 {movie.imdbVotes}</span>
            {movie.Rated !== 'N/A' && <span className={styles.badge}>{movie.Rated}</span>}
          </div>

          <p className={styles.genre}>{movie.Genre}</p>
          <p className={styles.plot}>{movie.Plot}</p>

          <table className={styles.table}>
            <tbody>
              <tr><td>Director</td><td>{movie.Director}</td></tr>
              <tr><td>Writer</td><td>{movie.Writer}</td></tr>
              <tr><td>Cast</td><td>{movie.Actors}</td></tr>
              <tr><td>Language</td><td>{movie.Language}</td></tr>
              <tr><td>Country</td><td>{movie.Country}</td></tr>
              {movie.Awards !== 'N/A' && (
                <tr><td>Awards</td><td>{movie.Awards}</td></tr>
              )}
            </tbody>
          </table>

          {/* ── Ratings ── */}
          {movie.Ratings?.length > 0 && (
            <div className={styles.ratings}>
              {movie.Ratings.map((r) => (
                <div key={r.Source} className={styles.ratingBox}>
                  <span className={styles.ratingSource}>{r.Source}</span>
                  <span className={styles.ratingValue}>{r.Value}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Watchlist button ── */}
          <button
            className={`${styles.watchlistBtn} ${inWatchlist ? styles.added : ''}`}
            onClick={() => inWatchlist ? removeMovie(movie.imdbID) : addMovie(movie)}
          >
            {inWatchlist ? '❤️ Watchlist-dən çıxar' : '🤍 Watchlist-ə əlavə et'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
