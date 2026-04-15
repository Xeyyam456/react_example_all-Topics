import { useState } from "react";
import styles from "./showHidePassword.module.css";

function ShowHidePassword() {
  const [isVisible, setIsVisible] = useState(false);

const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Show / Hide Password</h2>

      <div className={styles.inputWrapper}>
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Şifrəni daxil et..."
          className={styles.input}
        />
        <button
          onClick={toggleVisibility}
          className={styles.button}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default ShowHidePassword;
