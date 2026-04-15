import Text from "../Text/Text";
import DarkMode from "../DarkMode/DarkMode";
import CurrentTime from "../CurrentTime/CurrentTime";
import WindowResizeTracker from "../WindowResizeTracker/WindowResizeTracker";
import styles from "./useEffectTasks.module.css";

function UseEffectTasks() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>useEffect Tasks</h1>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Task 1 — Text Changer</h3>
        <Text />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Task 2 — Dark Mode</h3>
        <DarkMode />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Task 3 — Current Time</h3>
        <CurrentTime />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Task 4 — Window Resize Tracker</h3>
        <WindowResizeTracker />
      </section>
    </div>
  );
}

export default UseEffectTasks;
