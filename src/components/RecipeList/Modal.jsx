import styles from "./recipeList.module.css";

export default function Modal({ title, items, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <ul className={styles.modalList}>
          {items.map((item, i) => (
            <li key={i} className={styles.modalItem}>{item}</li>
          ))}
        </ul>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
