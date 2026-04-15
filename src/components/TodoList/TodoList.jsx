import { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import styles from "./todoList.module.css";

const STORAGE_KEY = "savedTodos";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [saved, setSaved] = useState(() => {
    // localStorage-dan mövcud saxlanılmış todo-ları oxu
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getTodos()
      .then((data) => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  // saved dəyişdikdə localStorage-a yaz
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  function handleAdd(todo) {
    // artıq əlavə olunubsa yenidən əlavə etmə
    if (saved.find((td) => td.id === todo.id)) return;
    setSaved((prev) => [...prev, todo]);
  }

  function handleRemove(id) {
    setSaved((prev) => prev.filter((td) => td.id !== id));
  }

  if (loading) return <p className={styles.loading}>Yüklənir...</p>;

  return (
    <div className={styles.wrapper}>
      {/* Sol tərəf — API-dan gələn bütün todolar */}
      <div className={styles.panel}>
        <h3 className={styles.panelTitle}>Bütün Todolar ({todos.length})</h3>
      <div className={styles.grid}>
          {todos.map((todo) => {
            const isAdded = saved.some((t) => t.id === todo.id);
            return (
              <div key={todo.id} className={`${styles.card} ${isAdded ? styles.cardAdded : ""}`}>
                <span className={`${styles.status} ${todo.completed ? styles.completed : styles.pending}`}>
                  {todo.completed ? "✔ Tamamlandı" : "⏳ Gözləyir"}
                </span>
                <p className={`${styles.text} ${todo.completed ? styles.done : ""}`}>
                  {todo.todo}
                </p>
                <button
                  className={styles.addBtn}
                  onClick={() => handleAdd(todo)}
                  disabled={isAdded}
                >
                  {isAdded ? "✓ Əlavə edildi" : "+ Saxla"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sağ tərəf — localStorage-a əlavə edilənlər */}
      <div className={styles.panel}>
        <h3 className={styles.panelTitle}>
          Saxlanılanlar ({saved.length})
        </h3>
        {saved.length === 0 ? (
          <p className={styles.empty}>Hələ heç nə əlavə edilməyib</p>
        ) : (
          <div className={styles.grid}>
            {saved.map((todo) => (
              <div key={todo.id} className={`${styles.card} ${styles.cardSaved}`}>
                <span className={`${styles.status} ${todo.completed ? styles.completed : styles.pending}`}>
                  {todo.completed ? "✔ Tamamlandı" : "⏳ Gözləyir"}
                </span>
                <p className={`${styles.text} ${todo.completed ? styles.done : ""}`}>
                  {todo.todo}
                </p>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(todo.id)}
                >
                  ✕ Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
