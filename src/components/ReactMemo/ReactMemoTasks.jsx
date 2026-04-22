import { useState, useCallback, memo } from "react";
import styles from "./reactMemo.module.css";

const CounterButton = memo(function CounterButton({ onClick, count }) {
  console.log("CounterButton render oldu");
  return (
    <button className={styles.btn} onClick={onClick}>
      Sayğac: {count}
    </button>
  );
});

// ── Ana komponent ─────────────────────────────────────────────────
function ReactMemoTasks() {
  const [count, setCount]   = useState(0);
  const [extra, setExtra]   = useState(0);

  // useCallback — onClick referansı sabit qalır → CounterButton re-render olmur
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Task 4: React.memo</h2>

      <div className={styles.card}>
        <p className={styles.desc}>
          <code>CounterButton</code> komponenti <code>React.memo</code> ilə
          sarılıb — yalnız <strong>onClick</strong> və ya{" "}
          <strong>count</strong> prop-u dəyişdikdə render olur.
        </p>

        {/* Bu düymə CounterButton-u render ETDİRİR (count prop dəyişir) */}
        <CounterButton onClick={increment} count={count} />

        <hr className={styles.divider} />

        {/* Bu düymə CounterButton-u render ETDİRMİR (props dəyişmir) */}
        <button
          className={styles.btnSecondary}
          onClick={() => setExtra((p) => p + 1)}
        >
          Kənar dəyər: {extra}
        </button>

        <p className={styles.hint}>
          Konsolda izləyin — "Kənar dəyər" düyməsinə basanda{" "}
          <code>CounterButton render oldu</code> yazılmır.
        </p>
      </div>
    </div>
  );
}

export default ReactMemoTasks;
