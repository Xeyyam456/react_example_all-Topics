import { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  function addMovie(movie) {
    const alreadyAdded = watchlist.some((m) => m.imdbID === movie.imdbID);
    if (alreadyAdded) return;
    setWatchlist([...watchlist, movie]);
  }

  function removeMovie(imdbID) {
    const filtered = watchlist.filter((m) => m.imdbID !== imdbID);
    setWatchlist(filtered);
  }

  function isInWatchlist(imdbID) {
    return watchlist.some((m) => m.imdbID === imdbID);
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
