import { useReducer } from "react";
import styles from "./registrationForm.module.css";

// ── Initial State ──────────────────────────────────────────────────
const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    submitted: false,
};

// ── Reducer ────────────────────────────────────────────────────────
function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.payload, submitted: false };
        case "RESET_FORM":
            return initialState;
        case "SUBMIT":
            return { ...state, submitted: true };
        default:
            return state;
    }
}

// ── Component ──────────────────────────────────────────────────────
export default function RegistrationForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        dispatch({
            type: "UPDATE_FIELD",
            field: e.target.name,
            payload: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT" });
    };

    const handleReset = () => {
        dispatch({ type: "RESET_FORM" });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Registration Form</h2>
                <p className={styles.subtitle}>
                    <code>useReducer</code> — Form State Management
                </p>

                {state.submitted ? (
                    <div className={styles.successBox}>
                        <div className={styles.successIcon}>✓</div>
                        <h3 className={styles.successTitle}>Registered Successfully!</h3>
                        <ul className={styles.summaryList}>
                            <li><span>Name:</span> {state.name}</li>
                            <li><span>Email:</span> {state.email}</li>
                            <li><span>Address:</span> {state.address}</li>
                        </ul>
                        <button className={styles.resetBtn} onClick={handleReset}>
                            Register Again
                        </button>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                className={styles.input}
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={state.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                id="email"
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                id="password"
                                className={styles.input}
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={state.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                className={`${styles.input} ${styles.textarea}`}
                                name="address"
                                placeholder="123 Main St, City"
                                value={state.address}
                                onChange={handleChange}
                                required
                                rows={3}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button type="submit" className={styles.submitBtn}>
                                Register
                            </button>
                            <button type="button" className={styles.resetBtn} onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </form>
                )}

                {/* State preview */}
                <div className={styles.stateBox}>
                    <p className={styles.stateTitle}>Reducer State</p>
                    <pre className={styles.statePre}>
                        {JSON.stringify(state, null, 1)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
