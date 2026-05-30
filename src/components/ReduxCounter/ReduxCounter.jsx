import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addByValue, subtractByValue, reset } from '../../store/counterSlice';
import styles from './reduxCounter.module.css';

function ReduxCounter() {
  // ── Redux state-i oxuyuruq ─────────────────────────────────
  // store-dakı state.counter.count dəyərini götürürük
  const count = useSelector((state) => state.counter.count);

  // ── Action göndərmək üçün dispatch alırıq ─────────────────
  const dispatch = useDispatch();

  // ── Input dəyəri (local state) ─────────────────────────────
  const [inputValue, setInputValue] = useState('');

  // ── Əməliyyat funksiyaları ─────────────────────────────────

  // "Addition" düyməsi basılanda
  function handleAdd() {
    const num = Number(inputValue);
    if (num > 0) {
      dispatch(addByValue(num));  // count + inputValue
      setInputValue('');           // input-u təmizlə
    }
  }

  // "Subtract" düyməsi basılanda
  function handleSubtract() {
    const num = Number(inputValue);
    if (num > 0) {
      dispatch(subtractByValue(num)); // count - inputValue (min 0)
      setInputValue('');               // input-u təmizlə
    }
  }

  // "Reset" düyməsi basılanda
  function handleReset() {
    dispatch(reset());   // count = 0
    setInputValue('');   // input-u da təmizlə
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Redux Counter</h2>

      {/* ── Count göstəricisi ── */}
      <div className={styles.counterRow}>
        {/* "-" düyməsi: 1 azaldır */}
        <button className={styles.circleBtn} onClick={() => dispatch(decrement())}>
          −
        </button>

        {/* Count dəyəri */}
        <span className={styles.countDisplay}>{count}</span>

        {/* "+" düyməsi: 1 artırır */}
        <button className={styles.circleBtn} onClick={() => dispatch(increment())}>
          +
        </button>
      </div>

      {/* ── Custom dəyər input-u ── */}
      <input
        className={styles.input}
        type="number"
        min="0"
        placeholder="Dəyər daxil edin..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* ── Addition / Subtract düymələri ── */}
      <div className={styles.actionRow}>
        <button className={`${styles.btn} ${styles.addBtn}`} onClick={handleAdd}>
          Addition
        </button>
        <button className={`${styles.btn} ${styles.subBtn}`} onClick={handleSubtract}>
          Subtract
        </button>
      </div>

      {/* ── Reset düyməsi ── */}
      <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default ReduxCounter;
