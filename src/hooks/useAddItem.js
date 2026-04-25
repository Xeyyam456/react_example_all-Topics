import { useState } from "react";

function useAddItem() {
    const [localItems, setLocalItems] = useState([]);

    const addItem = (item) => {
        const alreadyAdded = localItems.some((i) => i.id === item.id);
        if (!alreadyAdded) {
            setLocalItems((prev) => [...prev, item]);
        }
    };

    return { localItems, addItem };
}

export default useAddItem;
