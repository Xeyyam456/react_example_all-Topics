import { useState } from "react";

export default function ToogleButton() {
  const [show, setShow] = useState(true);


const handleClick = () => {
  setShow(prev => !prev);
  // setShow(!show);
}


  return (
    <div>
      <p>{show ? "Text A" : "Text B"}</p>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
}






