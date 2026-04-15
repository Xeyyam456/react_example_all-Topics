import { useState } from "react";
import styles from "./emailValidator.module.css";

const MIN_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.(com|net|org|az|io|edu|gov)$/i;

const RULES = [
  { key: "at",  label: "@ işarəsi",                          check: (v) => v.includes("@") },
  { key: "len", label: `Min ${MIN_LENGTH} simvol`,           check: (v) => v.length >= MIN_LENGTH },
  { key: "end", label: ".com / .net / .org / .az ilə bitmə", check: (v) => EMAIL_REGEX.test(v) },
];

function EmailValidator() {
  const [email, setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = email.length > 0 && RULES.every((r) => r.check(email));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Email Validator</h2>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input
          type="text"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setSubmitted(false); }}
          className={`${styles.input} ${
            email.length > 0 ? (isValid ? styles.inputValid : styles.inputInvalid) : ""
          }`}
        />

        {email.length > 0 && (
          <ul className={styles.errorList}>
            {RULES.map(({ key, label, check }) => (
              <li key={key} className={check(email) ? styles.ruleOk : styles.ruleFail}>
                <span className={styles.icon}>{check(email) ? "✓" : "✗"}</span> {label}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.btn} disabled={!isValid}>
          Yoxla
        </button>
      </form>

      {submitted && isValid && (
        <p className={styles.successMsg}>✓ Email düzgündür: <strong>{email}</strong></p>
      )}
    </div>
  );
}

export default EmailValidator;
