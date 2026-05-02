import styles from "./contact.module.css";

function Contact() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Əlaqə</h1>

      <div className={styles.grid}>
        <div className={styles.infoBox}>
          <h2 className={styles.infoTitle}>Bizimlə əlaqə saxlayın</h2>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📍</span>
            <div>
              <p className={styles.infoLabel}>Ünvan</p>
              <p className={styles.infoValue}>Nizami küç. 42, Bakı, Azərbaycan</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>📞</span>
            <div>
              <p className={styles.infoLabel}>Telefon</p>
              <p className={styles.infoValue}>+994 12 555 00 11</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>✉️</span>
            <div>
              <p className={styles.infoLabel}>E-mail</p>
              <p className={styles.infoValue}>info@bistro.az</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>🕐</span>
            <div>
              <p className={styles.infoLabel}>İş saatları</p>
              <p className={styles.infoValue}>Bazar ertəsi – Cümə: 10:00 – 22:00</p>
              <p className={styles.infoValue}>Şənbə – Bazar: 11:00 – 23:00</p>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h2 className={styles.infoTitle}>Mesaj göndərin</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ad Soyad</label>
            <input type="text" placeholder="Adınız" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input type="email" placeholder="email@nümunə.com" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mesaj</label>
            <textarea placeholder="Mesajınız..." rows={5} className={styles.textarea} />
          </div>
          <button type="submit" className={styles.btn}>Göndər</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
