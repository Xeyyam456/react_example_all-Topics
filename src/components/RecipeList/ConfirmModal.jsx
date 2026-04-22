import styles from "./recipeList.module.css";

export default function ConfirmModal({ name, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Silmək istədiyinizə əminsiniz?</h3>
        <p className={styles.confirmText}>
          <strong>"{name}"</strong> reseptini siyahıdan silmək üzrəsiniz.
        </p>
        <div className={styles.confirmBtns}>
          <button className={`${styles.btn} ${styles.btnRed}`} onClick={onConfirm}>Bəli, sil</button>
          <button className={`${styles.btn} ${styles.btnGray}`} onClick={onCancel}>Ləğv et</button>
        </div>
      </div>
    </div>
  );
}
