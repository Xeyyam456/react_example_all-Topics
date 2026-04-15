import { useState } from "react";
import styles from "./passwordValidator.module.css";

const RULES = [
  { key: "len",   label: "Min 10 simvol",       check: (v) => v.length >= 10 },
  { key: "upper", label: "Böyük hərf (A-Z)",     check: (v) => /[A-Z]/.test(v) },
  { key: "lower", label: "Kiçik hərf (a-z)",     check: (v) => /[a-z]/.test(v) },
  { key: "num",   label: "Rəqəm (0-9)",          check: (v) => /[0-9]/.test(v) },
];

function PasswordValidator() {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = password.length > 0 && RULES.every((r) => r.check(password));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Password Validator</h2>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.inputWrapper}>
          <input
            type={show ? "text" : "password"}
            placeholder="Şifrəni daxil edin"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setSubmitted(false); }}
            className={`${styles.input} ${
              password.length > 0 ? (isValid ? styles.inputValid : styles.inputInvalid) : ""
            }`}
          />
          <button type="button" className={styles.toggleBtn} onClick={() => setShow(!show)}>
            {show ? "Gizlət" : "Göstər"}
          </button>
        </div>

        {password.length > 0 && (
          <ul className={styles.ruleList}>
            {RULES.map(({ key, label, check }) => (
              <li key={key} className={check(password) ? styles.ruleOk : styles.ruleFail}>
                <span className={styles.icon}>{check(password) ? "✓" : "✗"}</span> {label}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.btn} disabled={!isValid}>
          Təsdiqlə
        </button>
      </form>

      {submitted && isValid && (
        <p className={styles.successMsg}>✓ Şifrə etibarlıdır!</p>
      )}
    </div>
  );
}

export default PasswordValidator;
