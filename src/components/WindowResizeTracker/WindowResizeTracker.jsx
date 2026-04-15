import { useState, useEffect } from "react";
import styles from "./windowResizeTracker.module.css";

function WindowResizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width:window.innerWidth,
    height:window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width:window.innerWidth,
        height:window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);




  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Window Resize Tracker</h2>

      <div className={styles.sizeBox}>
        <span className={styles.label}>Width</span>
        <span className={styles.value}>{windowSize.width} px</span>
      </div>

      <div className={styles.sizeBox}>
        <span className={styles.label}>Height</span>
        <span className={styles.value}>{windowSize.height} px</span>
      </div>

     
    </div>
  );
}

export default WindowResizeTracker;
