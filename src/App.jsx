import { Routes, Route, Navigate } from 'react-router-dom';

// ── Welcome ──────────────────────────────────────────────────────────────────
import Welcome from './components/Welcome/Welcome';

// ── Layout ──────────────────────────────────────────────────────────────────
import AppLayout from './components/AppLayout/AppLayout';

// ── Movies ──────────────────────────────────────────────────────────────────
import MoviesLayout  from './components/Movies/MoviesLayout';
import MoviesByYear  from './components/Movies/MoviesByYear';
import MovieDetail   from './components/Movies/MovieDetail';
import Watchlist     from './components/Movies/Watchlist';

// ── Restaurant ──────────────────────────────────────────────────────────────
import RestaurantLayout from './components/Restaurant/Layout/RestaurantLayout';
import RestaurantHome   from './components/Restaurant/Home/RestaurantHome';
import About            from './components/Restaurant/About/About';
import AboutOverview    from './components/Restaurant/About/AboutOverview';
import Team             from './components/Restaurant/About/Team';
import History          from './components/Restaurant/About/History';
import Contact          from './components/Restaurant/Contact/Contact';
import Menu             from './components/Restaurant/Menu/Menu';
import ProductDetail    from './components/Restaurant/Menu/ProductDetail';

// ── Products ────────────────────────────────────────────────────────────────
import Products from './components/ShopHome/Products/Products';

// ── Shop ─────────────────────────────────────────────────────────────────────
import ShopHome          from './components/ShopHome/ShopHome';
import ShopProductDetail from './components/ShopHome/ProductDetail/ShopProductDetail';

// ── Calculator ──────────────────────────────────────────────────────────────
import CalcHome      from './components/Calculator/Home';
import CalcOperation from './components/Calculator/Operation';

// ── Users ───────────────────────────────────────────────────────────────────
import UserTable  from './components/UserTable/UserTable';
import UserDetail from './components/UserDetail/UserDetail';
import UserList   from './components/UserList/UserList';

// ── Reducers ────────────────────────────────────────────────────────────────
import CounterReducer    from './components/CounterReducer/CounterReducer';
import TodoReducer       from './components/TodoReducer/TodoReducer';
import RegistrationForm  from './components/RegistrationForm/RegistrationForm';

// ── Hooks demos ─────────────────────────────────────────────────────────────
import UseEffectTasks  from './components/UseEffectTasks/UseEffectTasks';
import UseMemoTasks    from './components/UseMemo/UseMemoTasks';
import UseCallbackTasks from './components/UseCallback/UseCallbackTasks';
import ReactMemoTasks  from './components/ReactMemo/ReactMemoTasks';

// ── Lists & Data ────────────────────────────────────────────────────────────
import TodoList       from './components/TodoList/TodoList';
import StudentList    from './components/StudentList/StudentList';
import RecipeList     from './components/RecipeList/RecipeList';
import RecipesManager from './components/RecipesManager/RecipesManager';

// ── UI Widgets ──────────────────────────────────────────────────────────────
import AutoFocusInput     from './components/AutoFocusInput/AutoFocusInput';
import BgColorCycler      from './components/BgColorCycler/BgColorCycler';
import CountDown          from './components/CountDown/CountDown';
import CurrentTime        from './components/CurrentTime/CurrentTime';
import DarkMode           from './components/DarkMode/DarkMode';
import WindowResizeTracker from './components/WindowResizeTracker/WindowResizeTracker';

// ─────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Routes>
      {/* ── Global sidebar layout wraps everything ── */}
      <Route element={<AppLayout />}>

        {/* Root → Welcome */}
        <Route path='/' element={<Welcome />} />

        {/* Movies */}
        <Route path='/movies' element={<MoviesLayout />}>
          <Route index element={<Navigate to='/movies/2024' replace />} />
          <Route path='watchlist'  element={<Watchlist />} />
          <Route path=':year'      element={<MoviesByYear />} />
          <Route path=':year/:id'  element={<MovieDetail />} />
        </Route>

        {/* Restaurant */}
        <Route path='/restaurant' element={<RestaurantLayout />}>
          <Route index element={<RestaurantHome />} />
          <Route path='about' element={<About />}>
            <Route index element={<AboutOverview />} />
            <Route path='team'    element={<Team />} />
            <Route path='history' element={<History />} />
          </Route>
          <Route path='contact'   element={<Contact />} />
          <Route path='menu'      element={<Menu />} />
          <Route path='menu/:id'  element={<ProductDetail />} />
        </Route>

        {/* Products */}
        <Route path='/products' element={<Products />} />

        {/* Shop */}
        <Route path='/shop'            element={<ShopHome />} />
        <Route path='/shop/:section'   element={<ShopHome />} />
        <Route path='/shop/products/detail/:id' element={<ShopProductDetail />} />

        {/* Calculator */}
        <Route path='/calculator'                        element={<CalcHome />} />
        <Route path='/calculator/:type/:num1/:num2'      element={<CalcOperation />} />

        {/* Users */}
        <Route path='/users'      element={<UserTable />} />
        <Route path='/users/:id'  element={<UserDetail />} />
        <Route path='/userlist'   element={<UserList />} />

        {/* Reducer demos */}
        <Route path='/demos/counter-reducer' element={<CounterReducer />} />
        <Route path='/demos/todo-reducer'    element={<TodoReducer />} />
        <Route path='/demos/registration'    element={<RegistrationForm />} />

        {/* Hook demos */}
        <Route path='/demos/useeffect'   element={<UseEffectTasks />} />
        <Route path='/demos/usememo'     element={<UseMemoTasks />} />
        <Route path='/demos/usecallback' element={<UseCallbackTasks />} />
        <Route path='/demos/reactmemo'   element={<ReactMemoTasks />} />

        {/* Lists & Data demos */}
        <Route path='/demos/todolist'       element={<TodoList />} />
        <Route path='/demos/studentlist'    element={<StudentList />} />
        <Route path='/demos/recipelist'     element={<RecipeList />} />
        <Route path='/demos/recipesmanager' element={<RecipesManager />} />
        <Route path='/demos/userlist'       element={<UserList />} />

        {/* UI Widget demos */}
        <Route path='/demos/autofocus'    element={<AutoFocusInput />} />
        <Route path='/demos/bgcolorcycler' element={<BgColorCycler />} />
        <Route path='/demos/countdown'    element={<CountDown />} />
        <Route path='/demos/currenttime'  element={<CurrentTime />} />
        <Route path='/demos/darkmode'     element={<DarkMode />} />
        <Route path='/demos/windowresize' element={<WindowResizeTracker />} />

      </Route>
    </Routes>
  );
}

export default App;
