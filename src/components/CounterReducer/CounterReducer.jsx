import { useReducer } from "react";
import styles from "./counterReducer.module.css";

// ── State ──────────────────────────────────────────────────────────
const initialState = {
    count: 0,
    text: ""
};

// ── Reducer ────────────────────────────────────────────────────────
function reducer(state, action) {
    switch (action.type) {



        case "Text": return { ...state, text: action.payload };
        case "Increment": return (state = { ...state, count: state.count + 1 })
        case "Decrement":
            const newCount = state.count > 0 ? state.count - 1 : 0;
            return { ...state, count: newCount };
        case "IncrementValue": return (state = {
            ...state, count: state.count + action.payload,
            text: ""

        })
       
        case "DecrementValue":
            const decrementedCount = state.count - action.payload;
            return {
                ...state,
                count: decrementedCount >= 0 ? decrementedCount : 0,
                text: ""
            };



        case "Reset": return initialState;
    }
}







// ── Component ──────────────────────────────────────────────────────
export default function CounterReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* Step seçimi: - 5 + */}
                <div className={styles.stepRow}>
                    <button className={styles.stepBtn} onClick={() => dispatch({ type: "Decrement" })}>-</button>
                    <span className={styles.stepValue}>{state.count}</span>
                    <button className={styles.stepBtn} onClick={() => dispatch({ type: "Increment" })}>+</button>
                </div>

                {/* Count inputu */}
                <input
                    className={styles.input}
                    type="number"
                    value={state.text}
                    onChange={(e) => dispatch({ type: "Text", payload: Number(e.target.value) })}
                />

                {/* Addition / Subtract */}
                <div className={styles.actionRow}>
                    <button className={styles.actionBtn} onClick={() => dispatch({ type: "IncrementValue", payload: Number(state.text) })}>Addition</button>
                    <button className={styles.actionBtn} onClick={() => dispatch({ type: "DecrementValue", payload: Number(state.text) })}>Subtract</button>
                </div>

                {/* Reset */}
                <button className={styles.resetBtn} onClick={() => dispatch({ type: "Reset" })}>Reset</button>

            </div>
        </div>
    );
}
