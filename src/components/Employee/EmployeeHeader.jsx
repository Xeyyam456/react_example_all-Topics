import { NavLink } from 'react-router-dom';
import styles from './employee.module.css';

function EmployeeHeader() {
  return (
    <div className={styles.header}>
      {/* Sol — başlıq */}
      <h4 className="mb-0">👤 Employee Manager</h4>

      {/* Mərkəz — naviqasiya linkləri */}
      <div className={styles.navLinks}>
        <NavLink
          to="/employee"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Table
        </NavLink>
        <NavLink
          to="/employee/add"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Add User
        </NavLink>
      </div>

      {/* Sağ — boş yer (simmetrika üçün) */}
      <div style={{ width: '160px' }} />
    </div>
  );
}

export default EmployeeHeader;
