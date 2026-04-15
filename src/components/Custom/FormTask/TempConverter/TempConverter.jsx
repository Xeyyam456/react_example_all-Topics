import { useState } from "react";
import styles from "./tempConverter.module.css";

function TempConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    if (value === "" || value === "-") {
      setFahrenheit("");
    } else {
      setFahrenheit(((parseFloat(value) * 9) / 5 + 32).toFixed(2));
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value === "" || value === "-") {
      setCelsius("");
    } else {
      setCelsius((((parseFloat(value) - 32) * 5) / 9).toFixed(2));
    }
  };

  const handleReset = () => {
    setCelsius("");
    setFahrenheit("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Temperature Converter</h2>
      <div className={styles.row}>
        <label className={styles.label}>Celsius (°C)</label>
        <input
          className={styles.input}
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          placeholder="Enter °C"
        />
      </div>
      <div className={styles.row}>
        <label className={styles.label}>Fahrenheit (°F)</label>
        <input
          className={styles.input}
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          placeholder="Enter °F"
        />
      </div>
      {celsius !== "" && fahrenheit !== "" && (
        <p className={styles.result}>
          {celsius} °C = {fahrenheit} °F
        </p>
      )}
      <button className={styles.resetBtn} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default TempConverter;
