import { useState, useEffect } from "react";

const texts = [
  "Salam, Dünya!",
  "React çox gözəldir!",
  "useState ilə dəyişirik",
  "useEffect işləyir",
  "setInterval hər 2 saniyədə!",
];

function Text() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "24px", textAlign: "center", marginTop: "40px" }}>
      {texts[index]}
    </div>
  );
}

export default Text;
