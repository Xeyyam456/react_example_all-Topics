import { createContext, useContext, useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';

const EmployeeContext = createContext();

// API-dən gələn obyekti öz formatımıza çeviririk
function toEmployee(item) {
  return {
    id:       item.id,
    fullname: item.fullName || item.fullname || '',
    email:    item.email    || '',
    age:      item.age      || '',
    position: item.position || '',
  };
}

// Öz formatımızı API formatına çeviririk
function toPayload(data) {
  return { fullName: data.fullname, email: data.email, age: data.age, position: data.position };
}
export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  useEffect(() => {
    EmployeeService.getEmployees().then((data) => {
      setEmployees(data.map(toEmployee));
      setLoading(false);
    });
  }, []);
  function addEmployee(data) {
    EmployeeService.addEmployee(toPayload(data)).then((saved) => {
      setEmployees((prev) => [...prev, toEmployee({ ...data, id: saved.id })]);
    });
  }
  function updateEmployee(id, data) {
    EmployeeService.updateEmployee(id, toPayload(data)).then(() => {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
      );
    });
  }
  function deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then(() => {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    });
  }
  return (
    <EmployeeContext.Provider value={{ employees, loading, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}
export function useEmployee() {
  return useContext(EmployeeContext);
}
