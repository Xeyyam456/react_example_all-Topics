import { useState, useEffect } from "react";
import styles from "./countDown.module.css";

const START = 15;

function CountDown() {
  const [count, setCount] = useState(START);

  useEffect(() => {

    if (count === 0) return;

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    


    return () => clearInterval(timer);
  }, [count]);

  const isDanger = count <= 5;
  const isFinished = count === 0;

  return (
    <div className={`${styles.container} ${isDanger ? styles.danger : styles.normal}`}>
      {isFinished ? (
        <h2 className={styles.message}>Vaxt bitdi!</h2>
      ) : (
        <>
          <p className={styles.label}>Geri sayım</p>
          <h1 className={styles.number}>{count}</h1>
          {isDanger && <p className={styles.warning}>Az qaldı!</p>}
        </>
      )}
    </div>
  );
}

export default CountDown;
