import styles from "./button.module.css";
import React from 'react'

const Button = ({ label, Click }) => {
    return (

        <button
            className={styles.btn}
            onClick={Click}>
            {label}
        </button>

    )
}

export default Button
