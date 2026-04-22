import { useState, useEffect, useMemo } from "react";
import UserService from "../../services/UserService";
import styles from "./useMemo.module.css";

function FilteredUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return users;
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  return (
    <div className={styles.card}>

      <input
        className={styles.input}
        type="text"
        placeholder="Ad, soyad və ya email ilə axtar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className={styles.loading}>Yüklənir...</p>
      ) : (
        <>
          <p className={styles.count}>
            Göstərilən: <strong>{filteredUsers.length}</strong> / {users.length}
          </p>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Email</th>
                  <th>Şöbə</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.company?.department ?? "—"}</td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.empty}>
                      Nəticə tapılmadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default FilteredUsers;
