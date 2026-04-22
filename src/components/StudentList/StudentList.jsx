import { useId, useState } from "react";
import styles from "./studentList.module.css";

const INITIAL_STUDENTS = [
  { id: 1, name: "Aynur Həsənova",  grade: "10-A", subject: "Riyaziyyat" },
  { id: 2, name: "Tural Məmmədov",  grade: "10-B", subject: "Fizika"      },
  { id: 3, name: "Leyla Əliyeva",   grade: "11-A", subject: "Kimya"       },
  { id: 4, name: "Rauf Quliyev",    grade: "11-B", subject: "Biologiya"   },
  { id: 5, name: "Nigar Babayeva",  grade: "12-A", subject: "İnformatika" },
  { id: 6, name: "Elçin Hüseynov", grade: "12-B", subject: "Tarix"       },
];

// ──────────────────────────────────────────────────────────────────────────────
// StudentRow — every row gets its OWN stable unique ID via useId
// ──────────────────────────────────────────────────────────────────────────────
function StudentRow({ student, checked, onChange }) {
  // useId generates a unique, stable ID like ":r0:", ":r1:", etc.
  // It survives re-renders and works correctly in SSR (no hydration mismatch).
  const checkboxId = useId();

  return (
    <tr className={`${styles.row} ${checked ? styles.rowChecked : ""}`}>
      <td className={styles.cell}>
        {/* htmlFor ties the <label> to the <input> using the generated ID */}
        <input
          id={checkboxId}
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={() => onChange(student.id)}
          aria-label={`${student.name} seç`}
        />
        <label htmlFor={checkboxId} className={styles.checkLabel} />
      </td>
      <td className={styles.cell}>{student.id}</td>
      <td className={styles.cell}>{student.name}</td>
      <td className={styles.cell}>{student.grade}</td>
      <td className={styles.cell}>{student.subject}</td>
    </tr>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// StudentList — parent component
// ──────────────────────────────────────────────────────────────────────────────
function StudentList() {
  const [selected, setSelected] = useState(new Set());

  // useId for the "select-all" checkbox — completely independent ID
  const selectAllId = useId();

  const allChecked   = selected.size === INITIAL_STUDENTS.length;
  const someChecked  = selected.size > 0 && !allChecked;

  function handleToggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSelectAll() {
    if (allChecked) {
      setSelected(new Set());
    } else {
      setSelected(new Set(INITIAL_STUDENTS.map((s) => s.id)));
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Tələbə Siyahısı — <code>useId</code> nümunəsi</h2>

      <p className={styles.description}>
        Hər sətirdəki <strong>checkbox</strong> öz unikal ID-sini{" "}
        <code>useId()</code> vasitəsilə alır. Bu ID,{" "}
        <code>&lt;input id=…&gt;</code> ilə <code>&lt;label htmlFor=…&gt;</code>{" "}
        arasında düzgün əlaqəni təmin edir — komponentin neçə dəfə render
        olunmasından asılı olmayaraq.
      </p>

      {/* ── select-all row ──────────────────────────────────────────── */}
      <div className={styles.selectAllBar}>
        <input
          id={selectAllId}
          type="checkbox"
          className={styles.checkbox}
          checked={allChecked}
          ref={(el) => { if (el) el.indeterminate = someChecked; }}
          onChange={handleSelectAll}
        />
        <label htmlFor={selectAllId} className={styles.selectAllLabel}>
          {allChecked
            ? "Hamısının seçimini sil"
            : someChecked
            ? `${selected.size} tələbə seçildi — hamısını seç`
            : "Hamısını seç"}
        </label>

        {selected.size > 0 && (
          <span className={styles.badge}>{selected.size} / {INITIAL_STUDENTS.length}</span>
        )}
      </div>

      {/* ── table ───────────────────────────────────────────────────── */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}></th>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Ad Soyad</th>
              <th className={styles.th}>Sinif</th>
              <th className={styles.th}>Fənn</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_STUDENTS.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                checked={selected.has(student.id)}
                onChange={handleToggle}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── useId debug panel ──────────────────────────────────────── */}
      <div className={styles.debugPanel}>
        <h4 className={styles.debugTitle}>useId nə qaytarır?</h4>
        <p className={styles.debugHint}>
          Aşağıdakı ID-lər <code>useId()</code> tərəfindən generasiya edilib.
          Hər komponentin öz unikal ID-si var:
        </p>
        <DebugIds />
      </div>
    </div>
  );
}

// Small helper just to visualise generated IDs
function DebugIds() {
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();

  return (
    <ul className={styles.debugList}>
      {[id1, id2, id3].map((id) => (
        <li key={id} className={styles.debugItem}>
          <code>{id}</code>
        </li>
      ))}
    </ul>
  );
}

export default StudentList;
