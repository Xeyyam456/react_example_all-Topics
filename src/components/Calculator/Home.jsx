import { useState } from "react";
import { Link } from "react-router-dom";
import { buildPath } from "../../router/routes";
import styles from "./home.module.css";

const OPERATIONS = [
  { label: "Toplama", symbol: "+", type: "add" },
  { label: "Çıxma", symbol: "−", type: "subtract" },
  { label: "Vurma", symbol: "×", type: "multiply" },
  { label: "Bölmə", symbol: "÷", type: "divide" },
];

function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const isValid = num1 !== "" && num2 !== "";

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Kalkulyator</h1>
      <p className={styles.subtitle}>İki ədəd daxil edin, sonra əməliyyat seçin</p>

      <div className={styles.inputs}>
        <input
          type="number"
          placeholder="Ədəd 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Ədəd 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.grid}>
        {OPERATIONS.map((op) => (
          <Link
            key={op.type}
            to={isValid ? buildPath(num1, num2, op.type) : "#"}
            className={`${styles.card} ${!isValid ? styles.disabled : ""}`}
            onClick={(e) => !isValid && e.preventDefault()}
          >
            <span className={styles.symbol}>{op.symbol}</span>
            <span className={styles.opLabel}>{op.label}</span>
          </Link>
        ))}
      </div>

      {!isValid && (
        <p className={styles.hint}>Zəhmət olmasa hər iki ədədi daxil edin</p>
      )}
    </div>
  );
}

export default Home;
