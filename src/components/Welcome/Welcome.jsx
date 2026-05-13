import styles from './welcome.module.css';

function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Where would you like to go?</p>
      </div>
    </div>
  );
}

export default Welcome;
