import styles from './chipsCard.module.css';

function ChipsCard({ onDelete }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>🥔 Chips</span>
      <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
    </div>
  );
}

export default ChipsCard;
