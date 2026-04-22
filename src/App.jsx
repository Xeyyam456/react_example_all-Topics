// ── UI Komponentləri ──────────────────────────────────────────────
// import Header from "./components/Header/Header";
// import Navbar from "./components/Navbar/Navbar";
// import List   from "./components/List/List";

// ── Uşaq Komponentləri ────────────────────────────────────────────
// import First from "./components/Childs/First";

// ── Toggle / Ref Tapşırıqları ─────────────────────────────────────
// import ToogleButton  from "./components/Custom/ToogleButton/ToogleButton";
// import HoverButton   from "./components/Custom/ToogleButton/HoverButton";
// import ClickButton   from "./components/Custom/ToogleButton/ClickButton";
// import TimerMessage  from "./components/Custom/ToogleButton/TimerMessage";
// import NumberDoubler from "./components/Custom/ToogleButton/NumberDoubler";
// import ColorChanger  from "./components/Custom/ToogleButton/ColorChanger";
// import FokusRef      from "./components/Custom/ToogleButton/FokusRef";

// ── Form Tapşırıqları ─────────────────────────────────────────────
// import TempConverter    from "./components/Custom/FormTask/TempConverter/TempConverter";
// import EmojiPicker      from "./components/Custom/FormTask/EmojiPicker/EmojiPicker";
// import UpperCaseBox     from "./components/Custom/FormTask/UpperCaseBox/UpperCaseBox";
// import ShowHidePassword from "./components/Custom/FormTask/ShowHidePassword/ShowHidePassword";
// import FilterList       from "./components/Custom/FormTask/FilterList/FilterList";
// import CounterWithInput from "./components/Custom/FormTask/CounterWithInput/CounterWithInput";
// import PokemonCart      from "./components/Custom/FormTask/PokemonCart/PokemonCart";
// import EmailValidator   from "./components/Custom/FormTask/EmailValidator/EmailValidator";
// import PasswordValidator from "./components/Custom/FormTask/PasswordValidator/PasswordValidator";
// import FormikTask       from "./components/Custom/FormTask/FormikTask/FormikTask";

// ── useEffect Tapşırıqları ────────────────────────────────────────
// import Text                from "./components/Text/Text";
// import DarkMode            from "./components/DarkMode/DarkMode";
// import CurrentTime         from "./components/CurrentTime/CurrentTime";
// import WindowResizeTracker from "./components/WindowResizeTracker/WindowResizeTracker";import BgColorCycler from "./components/BgColorCycler/BgColorCycler";
// import BgColorCycler from "./components/BgColorCycler/BgColorCycler";
// import CountDown from "./components/CountDown/CountDown";
// import AutoFocusInput from "./components/AutoFocusInput";
import UserTable from "./components/UserTable/UserTable";
import TodoList from "./components/TodoList";
// ── useMemo Tapşırıqları ──────────────────────────────────────────
import UseMemoTasks from "./components/UseMemo";
// ── useCallback Tapşırıqları ──────────────────────────────────────
import UseCallbackTasks from "./components/UseCallback";
// ── React.memo Tapşırıqları ────────────────────────────────────────
import ReactMemoTasks from "./components/ReactMemo";// ── Task5: useCallback + React.memo + useMemo ───────────────────
import UserList from "./components/UserList/UserList";function App() {
  return (
    <div className="App mt-5">

      {/* ── UI ────────────────────────────── */}
      {/* <Header /> */}
      {/* <Navbar /> */}
      {/* <List />  */}

      {/* ── Uşaq Komponentləri ────────────── */}
      {/* <First /> */}

      {/* ── Toggle / Ref ──────────────────── */}
      {/* <ToogleButton /> */}
      {/* <HoverButton /> */}
      {/* <ClickButton /> */}
      {/* <TimerMessage /> */}
      {/* <NumberDoubler /> */}
      {/* <ColorChanger /> */}
      {/* <FokusRef /> */}

      {/* ── Form Tapşırıqları ─────────────── */}
      {/* <TempConverter /> */}
      {/* <EmojiPicker /> */}
      {/* <UpperCaseBox /> */}
      {/* <ShowHidePassword /> */}
      {/* <FilterList /> */}
      {/* <CounterWithInput /> */}
      {/* <PokemonCart /> */}
      {/* <EmailValidator /> */}
      {/* <PasswordValidator /> */}
      {/* <FormikTask /> */}

      {/* ── useEffect Tapşırıqları ────────── */}
      {/* <Text /> */}
      {/* <DarkMode /> */}
      {/* <CurrentTime /> */}
      {/* <WindowResizeTracker /> */}
      {/* <BgColorCycler /> */}
      {/* <CountDown /> */}
      {/* <AutoFocusInput /> */}.
      {/* <UserTable /> */}
      {/* <TodoList /> */}
      {/* ── useMemo Tapşırıqları ──────────── */}
      {/* <UseMemoTasks /> */}
      {/* ── useCallback Tapşırıqları ─────── */}
      {/* <UseCallbackTasks /> */}
      {/* ── React.memo Tapşırıqları ──────── */}
      {/* <ReactMemoTasks /> */}
      {/* ── Task5: useCallback+memo+useMemo ─ */}
      <UserList />

    </div>
  );
}

export default App;
