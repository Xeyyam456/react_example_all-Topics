import { useFormik } from 'formik';
import { useEmployee } from '../../context/EmployeeContext';

function UpdateModal({ employee, onClose }) {
  const { updateEmployee } = useEmployee();

  const formik = useFormik({
    initialValues: {
      fullname: employee.fullname,
      email: employee.email,
      position: employee.position,
      age: employee.age,
    },
    onSubmit: (values) => {
      updateEmployee(employee.id, values);
      onClose();
    },
  });

  return (
    // Bootstrap modal backdrop
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
            <button className="btn-close" type="button" onClick={onClose} />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
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
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
