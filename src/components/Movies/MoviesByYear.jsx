import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieService from '../../services/MovieService';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import styles from './moviesByYear.module.css';

function MoviesByYear() {
  const { year } = useParams();

  const [movies, setMovies]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [activeID, setActiveID] = useState(null); // modal üçün seçilmiş film

  // Year dəyişəndə yenidən sorğu at
  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies([]);
    setActiveID(null);

    MovieService.searchByYear(year)
      .then((data) => setMovies(data.Search || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [year]);

  return (
    <section>
      <h2 className={styles.heading}>{year} — Movies</h2>

      {loading && <p className={styles.status}>Yüklənir...</p>}
      {error   && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => setActiveID(movie.imdbID)}
            />
          ))}
        </div>
      )}

      {/* Modal — activeID olduqda açılır */}
      {activeID && (
        <MovieModal
          imdbID={activeID}
          year={year}
          onClose={() => setActiveID(null)}
        />
      )}
    </section>
  );
}

export default MoviesByYear;
