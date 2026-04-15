import { useState } from "react";
import styles from "./counterWithInput.module.css";

function CounterWithInput() {
  const [count, setCount] = useState(0);
  const [inputVal, setInputVal] = useState(1);
  const [warning, setWarning] = useState("");

  const handleAdd = () => {
    setCount(count + inputVal);
    setWarning("");
  };

  const handleSubtract = () => {
    if (inputVal > count) {
      setWarning("Dəyər böyükdür!");
    } else {
      setCount(count - inputVal);
    }
  };

  const handleReset = () => {
    setCount(0);
    setWarning("");
    setInputVal(1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e) => {
    setInputVal(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h2>Counter</h2>

      <div className={styles.controls}>
        <button onClick={handleDecrement}>-</button>
        <span className={styles.count}>{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>

      <input
        type="number"
        value={inputVal}
        onChange={handleInputChange}
        className={styles.input}
      />

      <div className={styles.actions}>
        <button onClick={handleAdd}>Addition</button>
        <button onClick={handleSubtract}>Subtract</button>
      </div>

      <button onClick={handleReset}>Reset</button>
<hr />
      <p>Cari dəyər: <strong>{count}</strong></p>

      {warning && <p className={styles.warning}>{warning}</p>}
    </div>
  );
}

export default CounterWithInput;
