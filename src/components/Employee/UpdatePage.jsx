import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEmployee } from '../../context/EmployeeContext';

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useEmployee();

  // URL-dəki id ilə işçini tap
  const employee = employees.find((emp) => emp.id === Number(id));

  if (!employee) {
    return <p className="text-center mt-5">Employee not found.</p>;
  }

  const formik = useFormik({
    initialValues: {
      fullname: employee.fullname,
      email: employee.email,
      position: employee.position,
      age: employee.age,
    },
    onSubmit: (values) => {
      updateEmployee(employee.id, values);
      navigate('/employee');
    },
  });

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4">Update User</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                className="form-control"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                className="form-control"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                className="form-control"
                name="age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-secondary w-50"
                type="button"
                onClick={() => navigate('/employee')}
              >
                Cancel
              </button>
              <button className="btn btn-primary w-50" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePage;
