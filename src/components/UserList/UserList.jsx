import { useState, useEffect, useCallback, memo } from "react";
import UserService from "../../services/UserService";
import styles from "./userList.module.css";

const UserCard = memo(function UserCard({ user }) {
  console.log(`UserCard render: ${user.firstName} ${user.lastName}`);
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={user.image}
        alt={user.firstName}
      />
      <div className={styles.info}>
        <p className={styles.name}>{user.firstName} {user.lastName}</p>
        <p className={styles.email}>{user.email}</p>
        <span className={styles.dept}>{user.company?.department ?? "—"}</span>
      </div>
    </div>
  );
});

function UserList() {
  const [users, setUsers]     = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  // useCallback — handleSearch referansı sabit qalır
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const term = search.toLowerCase().trim();
  const filtered = term
    ? users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(term) ||
          u.lastName.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      )
    : users;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>UserList</h2>
     

      <input
        className={styles.input}
        type="text"
        placeholder="Ad, soyad və ya email ilə axtar..."
        value={search}
        onChange={handleSearch}
      />

      {loading ? (
        <p className={styles.loading}>Yüklənir...</p>
      ) : (
        <>
          <p className={styles.count}>
            <strong>{filtered.length}</strong> / {users.length} istifadəçi
          </p>
          <div className={styles.grid}>
            {filtered.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
            {filtered.length === 0 && (
              <p className={styles.empty}>Nəticə tapılmadı.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
