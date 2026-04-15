import { useState, useEffect } from "react";
import styles from "./darkMode.module.css";

function DarkMode() {
  
  const savedMode = localStorage.getItem("darkMode") === "true";
  const [isDark, setIsDark] = useState(savedMode);

  useEffect(() => {
    
    localStorage.setItem("darkMode", isDark);

   
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]); 

  const modeLabel   = isDark ? "🌙 Dark"            : "☀️ Light";
  const btnText     = isDark ? "Light Mode-a keç"   : "Dark Mode-a keç";
  const btnStyle    = isDark ? styles.dark           : styles.light;


  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={styles.container}>

      <span className={styles.label}>
        {modeLabel}
      </span>

      <button
        className={`${styles.toggle} ${btnStyle}`}
        onClick={handleToggle}
      >
        {btnText}
      </button>

    </div>
  );
}

export default DarkMode;
