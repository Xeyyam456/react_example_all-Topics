import { useEffect, useRef } from "react";
import styles from "./autoFocusInput.module.css";

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // komponent render olunduqda input-a fokus ver
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Adınızı yazın:</label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Buraya yazın..."
        className={styles.input}
        // autoFocus
      />
    </div>
  );
}

export default AutoFocusInput;
