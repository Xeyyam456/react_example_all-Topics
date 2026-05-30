import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './appLayout.module.css';
import useThemeStore from '../../store/useThemeStore';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// ─── Sidebar navigation config ────────────────────────────────────────────────

const NAV = [
  {
    section: '✅ Todo App',
    path: '/todo-app',
  },
  {
    section: '🎬 Movies',
    path: '/movies',
  },
  {
    section: '🍽 Restaurant',
    path: '/restaurant',
  },
  {
    section: '🛍 Products',
    path: '/products',
  },
  {
    section: '🏪 Shop',
    path: '/shop',
  },
  {
    section: '🛒 Cart',
    children: [
      { label: 'Add Item', path: '/add' },
      { label: 'Cart',     path: '/cart' },
    ],
  },
  {    section: '👥 Employee',
    children: [
      { label: 'User Table', path: '/employee' },
      { label: 'Add User',   path: '/employee/add' },
    ],
  },
  {    section: '🧮 Calculator',
    path: '/calculator',
  },
  {
    section: '👥 Users',
    path: '/users',
  },
  {
    section: '📋 Reducers',
    children: [
      { label: 'Counter Reducer', path: '/demos/counter-reducer' },
      { label: 'Redux Counter',     path: '/demos/redux-counter' },
      { label: 'Todo Reducer',    path: '/demos/todo-reducer' },
      { label: 'Registration',    path: '/demos/registration' },
    ],
  },
  {
    section: '⚛️ Hooks',
    children: [
      { label: 'useEffect',    path: '/demos/useeffect' },
      { label: 'useMemo',      path: '/demos/usememo' },
      { label: 'useCallback',  path: '/demos/usecallback' },
      { label: 'React.memo',   path: '/demos/reactmemo' },
    ],
  },
  {
    section: '📝 Lists & Data',
    children: [
      { label: 'Todo List',        path: '/demos/todolist' },
      { label: 'Student List',     path: '/demos/studentlist' },
      { label: 'Recipe List',      path: '/demos/recipelist' },
      { label: 'Recipes Manager',  path: '/demos/recipesmanager' },
      { label: 'User List',        path: '/demos/userlist' },
    ],
  },
  {
    section: '🎛 UI Widgets',
    children: [
      { label: 'Auto Focus Input',    path: '/demos/autofocus' },
      { label: 'BgColor Cycler',      path: '/demos/bgcolorcycler' },
      { label: 'Countdown',           path: '/demos/countdown' },
      { label: 'Current Time',        path: '/demos/currenttime' },
      { label: 'Dark Mode',           path: '/demos/darkmode' },
      { label: 'Window Resize',       path: '/demos/windowresize' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SidebarLink({ path, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeLink : ''}`
      }
    >
      {label}
    </NavLink>
  );
}

function SidebarGroup({ item }) {
  const [open, setOpen] = useState(true);

  // Top-level single link (no children)
  if (!item.children) {
    return (
      <SidebarLink path={item.path} label={item.section} />
    );
  }

  // Collapsible group with children
  return (
    <div className={styles.group}>
      <button
        className={styles.groupTitle}
        onClick={() => setOpen((prev) => !prev)}
      >
        {item.section}
        <span className={styles.arrow}>{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className={styles.groupLinks}>
          {item.children.map((child) => (
            <SidebarLink key={child.path} path={child.path} label={child.label} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main layout ──────────────────────────────────────────────────────────────

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDark } = useThemeStore();

  return (
    <div className={`${styles.wrapper} ${isDark ? styles.dark : styles.light}`}>
      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.collapsed}`}>
        <div className={styles.sidebarHeader}>
          {sidebarOpen && <span className={styles.brand}>⚡ DevHub</span>}
          <div className={styles.headerActions}>
            <ThemeToggle />
            <button
              className={styles.toggleBtn}
              onClick={() => setSidebarOpen((prev) => !prev)}
              title="Sidebar-ı aç/bağla"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <SidebarGroup key={item.section} item={item} />
            ))}
          </nav>
        )}
      </aside>

      {/* ── Page content ── */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
