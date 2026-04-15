import { useState } from "react";

export default function HoverButton() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                Hover et
            </button>
            {show && <p>Hello World</p>}
        </div>
    );
}