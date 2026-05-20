import useThemeStore from '../../store/useThemeStore';
import styles from './themeToggle.module.css';

function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
