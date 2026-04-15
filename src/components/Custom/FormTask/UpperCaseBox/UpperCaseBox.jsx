import { useState } from "react";
import styles from "./upperCaseBox.module.css";

function UpperCaseBox() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");



  const handleConvert = () => {
    setResult(input.toUpperCase());
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>UpperCase Converter</h2>



      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Mətn daxil et..."
        className={styles.input}
      />

      <button
        onClick={handleConvert}
        className={styles.button}
      >
        Convert
      </button>

      {result && <p className={styles.result}>{result}</p>}
    </div>
  );
}

export default UpperCaseBox;
