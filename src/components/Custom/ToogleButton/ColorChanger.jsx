import { useState } from "react";

const colors = [
  { name: "red",    hex: "#E24B4A" },
  { name: "orange",   hex: "#EF9F27" },
  { name: "yellow",      hex: "#F5C43B" },
  { name: "green",     hex: "#639922" },
  { name: "blue",      hex: "#378ADD" },
  { name: "purple", hex: "#7F77DD" },
];

export default function ColorChanger() {
  const [index, setIndex] = useState(0);

  const nextColor = () => {
    setIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div
        style={{
          width: 220,
          height: 220,
          background: colors[index].hex,
          borderRadius: 16,
          margin: "0 auto 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </div>
      <button onClick={nextColor}>Next Color</button>
    </div>
  );
}