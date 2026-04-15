import { useState } from "react";

export default function ClickButton() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      {showMessage && <p>Salam</p>}
    </div>
  );
}