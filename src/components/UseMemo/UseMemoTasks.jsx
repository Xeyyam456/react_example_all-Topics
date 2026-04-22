import FilteredUsers from "./FilteredUsers";
import styles from "./useMemo.module.css";

function UseMemoTasks() {
  return (
    <div className={styles.wrapper}>
      <FilteredUsers />
    </div>
  );
}

export default UseMemoTasks;
