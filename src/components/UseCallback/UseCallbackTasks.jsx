import { useState, useCallback } from "react";
import styles from "./useCallback.module.css";

function UseCallbackTasks() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = useCallback(() => {
    const value = input.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setInput("");
  }, [input]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Task 3: useCallback</h2>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Dəyər daxil edin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.addBtn} onClick={handleAdd}>
          Əlavə et
        </button>
      </div>

      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.listItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseCallbackTasks;

