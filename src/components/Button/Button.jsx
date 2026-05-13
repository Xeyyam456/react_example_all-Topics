import styles from './button.module.css';

function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) {
  const cls = [styles.btn, styles[variant]].filter(Boolean).join(' ');
  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}

export default Button;

