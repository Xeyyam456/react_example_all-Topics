import { useId } from "react";

const students = [
  { id: 1, name: "Aynur Həsənova" },
  { id: 2, name: "Tural Məmmədov" },
  { id: 3, name: "Leyla Əliyeva"  },
];

function StudentItem({ student }) {
  const id = useId();
  console.log("id", id);

  return (
    <li>
      <input id={id} type="checkbox" />
      <label htmlFor={id}>{student.name}</label>
    </li>
  );
}

function StudentList() {
  return (
    <ul>
      {students.map((s) => (
        <StudentItem key={s.id} student={s} />
        
      ))}
    </ul>
  );
}

export default StudentList;
