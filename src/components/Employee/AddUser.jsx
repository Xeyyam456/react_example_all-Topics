import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEmployee } from '../../context/EmployeeContext';
function AddUser() {
  const navigate = useNavigate();
  const { addEmployee } = useEmployee();
  const firstInputRef = useRef(null);
  // Səhifə açılanda birinci inputa fokuslan
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);
const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      position: '',
      age: '',
    },
    onSubmit: (values) => {
      addEmployee(values);
      navigate('/employee');
    },
  });
  // Bütün sahələr dolubsa button aktiv olur
  const isFormEmpty =
    !formik.values.fullname.trim() ||
    !formik.values.email.trim() ||
    !formik.values.position.trim() ||
    !formik.values.age;

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4">Add User</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                ref={firstInputRef}
                className="form-control"
                name="fullname"
                placeholder="Full Name"
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
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                className="form-control"
                name="position"
                placeholder="Position"
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
                placeholder="Age"
                value={formik.values.age}
                onChange={formik.handleChange}
              />
            </div>
            <button
              className="btn btn-success w-100"
              type="submit"
              disabled={isFormEmpty}
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
