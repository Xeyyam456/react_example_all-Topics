import { useState, useEffect } from "react";
import styles from "./currentTime.module.css";

function CurrentTime() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);


    
    return () => clearInterval(interval);
  }, []);

 
  const hours   = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");



  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Current Time</h2>

      <div className={styles.clock}>
        {hours} : {minutes} : {seconds}
        {/* {time.toTimeString().split(" ")[0]} HH:MM:SS formatında göstərir */ }
      </div>

     
    </div>
  );
}

export default CurrentTime;
