import { useParams, Link } from "react-router-dom";
import { ROUTER } from "../../router/routes";
import styles from "./operation.module.css";

const OPERATIONS = {
  add: {
    label: "Toplama",
    symbol: "+",
    calculate: (a, b) => a + b,
  },
  subtract: {
    label: "Çıxma",
    symbol: "−",
    calculate: (a, b) => a - b,
  },
  multiply: {
    label: "Vurma",
    symbol: "×",
    calculate: (a, b) => a * b,
  },
  divide: {
    label: "Bölmə",
    symbol: "÷",
    calculate: (a, b) => (b === 0 ? null : a / b),
  },
};

function Operation() {
  const { type, num1, num2 } = useParams();
  const op = OPERATIONS[type];

  if (!op) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <p className={styles.errorMsg}>Naməlum əməliyyat: {type}</p>
        </div>
        <Link to={ROUTER.HOME} className={styles.backLink}>← Geri qayıt</Link>
      </div>
    );
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  const result = op.calculate(n1, n2);
  const isError = result === null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{op.label}</h2>
        <div className={styles.expression}>
          <span className={styles.num}>{n1}</span>
          <span className={styles.operator}>{op.symbol}</span>
          <span className={styles.num}>{n2}</span>
          <span className={styles.equals}>=</span>
          <span className={`${styles.result} ${isError ? styles.error : ""}`}>
            {isError ? "Sıfıra bölmək olmaz!" : result}
          </span>
        </div>
      </div>
      <Link to={ROUTER.HOME} className={styles.backLink}>← Geri qayıt</Link>
    </div>
  );
}

export default Operation;
