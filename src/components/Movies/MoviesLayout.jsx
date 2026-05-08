import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './moviesLayout.module.css';

const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

function MoviesLayout() {
  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <Link to='/movies' className={styles.brand}>
          🎬 MovieHub
        </Link>
        <NavLink
          to='/movies/watchlist'
          className={({ isActive }) =>
            `${styles.watchlistLink} ${isActive ? styles.watchlistActive : ''}`
          }
        >
          ❤️ Watchlist
        </NavLink>
      </header>

      {/* ── Year tabs ── */}
      <nav className={styles.yearNav}>
        {YEARS.map((year) => (
          <NavLink
            key={year}
            to={`/movies/${year}`}
            className={({ isActive }) =>
              `${styles.yearBtn} ${isActive ? styles.activeYear : ''}`
            }
          >
            {year}
          </NavLink>
        ))}
      </nav>

      {/* ── Page content ── */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default MoviesLayout;
