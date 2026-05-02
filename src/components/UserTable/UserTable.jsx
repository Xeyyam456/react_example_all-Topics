import { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./userTable.module.css";
import UserService from "../../services/UserService";

function getRoleClass(role) {
  if (role === "admin") return styles.roleAdmin;
  if (role === "moderator") return styles.roleModerator;
  return styles.roleUser;
}

async function GetDatas(setDatas, setLoading) {
  try {
    const users = await UserService.getUsers();
    setDatas(users);
    toast.success(`${users.length} istifadəçi uğurla yükləndi!`);
  } catch (err) {
    toast.error("Xəta: " + err.message);
  } finally {
    setLoading(false);
  }
}

function UserTable() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetDatas(setDatas, setLoading);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <Spinner animation="border" variant="primary" />
        <p className={styles.loadingText}>Yüklənir...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className={styles.title}>İstifadəçilər</h2>

      <div className={styles.tableScroll}>
        <Table striped bordered hover responsive>
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
              <th>Ətraflı</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((user) => (
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
                  <span className={getRoleClass(user.role)}>{user.role}</span>
                </td>
                <td>
                  <Link to={`/users/${user.id}`} className={styles.detailLink}>
                    Bax
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserTable;
