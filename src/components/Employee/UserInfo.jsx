import { useNavigate, useParams } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';

function UserInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployee();

  // URL-dəki id ilə işçini tap
  const employee = employees.find((emp) => emp.id === Number(id));

  if (!employee) {
    return <p className="text-center mt-5">Employee not found.</p>;
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-5">
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4">User Info</h3>

          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Full Name:</strong> {employee.fullname}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {employee.email}
            </li>
            <li className="list-group-item">
              <strong>Position:</strong> {employee.position}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {employee.age}
            </li>
          </ul>

          <button
            className="btn btn-secondary w-100"
            onClick={() => navigate('/employee')}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
