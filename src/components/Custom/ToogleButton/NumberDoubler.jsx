import { useState } from "react";

export default function NumberDoubler() {
  const [number, setNumber] = useState(1);

  const handleDouble = () => {
    setNumber(prev => prev * 2);
  };

  return (
    <div>
      <p>{number}</p>
      <button onClick={handleDouble}>Double Number</button>
    </div>
  );
}