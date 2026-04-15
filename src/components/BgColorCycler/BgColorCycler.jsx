import { useState, useEffect } from "react";
import styles from "./bgColorCycler.module.css";

const COLORS = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFD93D",
  "#C77DFF",
  "#FF9F43",
  "#00C9A7",
];



function BgColorCycler() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex(Math.floor(Math.random() * COLORS.length));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: COLORS[colorIndex] }}
    >
      <p className={styles.colorCode}>{COLORS[colorIndex]}</p>
    </div>
  );
}

export default BgColorCycler;
