import { Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './components/UserTable/UserTable';
import UserDetail from './components/UserDetail/UserDetail';
import Home from './components/Calculator/Home';
import Operation from './components/Calculator/Operation';
import { ROUTER } from './router/routes';
import Products from './components/Products/Products';

// Movies
import MoviesLayout from './components/Movies/MoviesLayout';
import MoviesByYear from './components/Movies/MoviesByYear';
import MovieDetail from './components/Movies/MovieDetail';
import Watchlist from './components/Movies/Watchlist';

// Restaurant
import RestaurantLayout from './components/Restaurant/Layout/RestaurantLayout';
import RestaurantHome from './components/Restaurant/Home/RestaurantHome';
import About from './components/Restaurant/About/About';
import AboutOverview from './components/Restaurant/About/AboutOverview';
import Team from './components/Restaurant/About/Team';
import History from './components/Restaurant/About/History';
import Contact from './components/Restaurant/Contact/Contact';
import Menu from './components/Restaurant/Menu/Menu';
import ProductDetail from './components/Restaurant/Menu/ProductDetail';

function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path='/' element={<Navigate to='/movies' replace />} />

      {/* Movies — nested routing by year */}
      <Route path='/movies' element={<MoviesLayout />}>
        <Route index element={<Navigate to='/movies/2024' replace />} />
        <Route path='watchlist' element={<Watchlist />} />
        <Route path=':year' element={<MoviesByYear />} />
        <Route path=':year/:id' element={<MovieDetail />} />
      </Route>

      {/* Users */}
      {/* <Route path='/' element={<div className='App mt-5'><UserTable /></div>} /> */}
      {/* <Route path='/users/:id' element={<UserDetail />} /> */}

      {/* Calculator */}
      {/* <Route path={ROUTER.HOME} element={<Home />} /> */}
       {/* <Route path={ROUTER.OPERATION} element={<Operation />} />  */}

      {/* Restaurant */}
      {/* <Route path='/restaurant' element={<RestaurantLayout />}>
        <Route index element={<RestaurantHome />} />
        <Route path='about' element={<About />}>
          <Route index element={<AboutOverview />} />
          <Route path='team' element={<Team />} />
          <Route path='history' element={<History />} />
        </Route>
        <Route path='contact' element={<Contact />} />
        <Route path='menu' element={<Menu />} />
        <Route path='menu/:id' element={<ProductDetail />} />
      </Route> */}
    </Routes>
  );
}

export default App;
