import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./userTable.module.css";
import UserService from "../../services/UserService";

// Rola görə CSS class qaytarır
function getRoleClass(role) {
  if (role === "admin") return styles.admin;
  if (role === "moderator") return styles.moderator;
  return styles.user;
}

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUsers()
      .then((users) => {
        setUsers(users);
        toast.success(`${users.length} istifadəçi uğurla yükləndi!`);
      })
      .catch((err) => {
        toast.error("Xəta: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <div className={styles.spinner}></div>
        <p>Yüklənir...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className={styles.title}>İstifadəçilər</h2>

  

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Yaş</th>
              <th>Şöbə</th>
              <th>Ünvan</th>
              <th>Kart nömrəsi</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>{user.company?.department}</td>
                <td>{user.address?.city}, {user.address?.country}</td>
                <td>{user.bank?.cardNumber}</td>
                <td>
                  <span className={`${styles.badge} ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
