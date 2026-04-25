import { useReducer } from "react";
import styles from "./todoReducer.module.css";

const initialState = { text: "", todos: [] };

function reducer(state, action) {
    switch (action.type) {
        case "SET_TEXT":
            return { ...state, text: action.payload };

        case "ADD_TODO":
            if (!state.text.trim()) return state;
            return {
                text: "",
                todos: [...state.todos, { id: Date.now(), text: state.text.trim(), done: false }],
            };

        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((t) => t.id !== action.payload),
            };

        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map((t) =>
                    t.id === action.payload ? { ...t, done: !t.done } : t
                ),
            };

        default:
            return state;
    }
}

export default function TodoReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Todo <span>List</span></h2>

                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        value={state.text}
                        onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && dispatch({ type: "ADD_TODO" })}
                        placeholder="New todo..."
                    />
                    <button className={styles.addBtn} onClick={() => dispatch({ type: "ADD_TODO" })}>+</button>
                </div>

                <ul className={styles.list}>
                    {state.todos.length === 0 && <p className={styles.empty}>No todos yet. Add one!</p>}
                    {state.todos.map((todo) => (
                        <li key={todo.id} className={`${styles.item} ${todo.done ? styles.itemDone : ""}`}>
                            <span
                                className={`${styles.text} ${todo.done ? styles.textDone : ""}`}
                                onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                            >
                                {todo.text}
                            </span>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

