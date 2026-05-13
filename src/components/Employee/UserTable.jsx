import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import UpdateModal from './UpdateModal';

function UserTable() {
  const navigate = useNavigate();
  const { employees, loading, deleteEmployee } = useEmployee();

  // Update modal üçün state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Delete təsdiq modalı üçün state
  const [deleteTarget, setDeleteTarget] = useState(null);

  function openModal(employee) {
    setSelectedEmployee(employee);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedEmployee(null);
    setShowModal(false);
  }

  function confirmDelete(employee) {
    setDeleteTarget(employee);
  }

  function handleDelete() {
    deleteEmployee(deleteTarget.id);
    setDeleteTarget(null);
  }

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email</th>
              <th>Position</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.fullname}</td>
                <td>{emp.age}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>

                {/* Update sütunu — modal və ya səhifə ilə */}
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => openModal(emp)}
                  >
                    Modal
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/employee/update/${emp.id}`)}
                  >
                    Page
                  </button>
                </td>

                {/* Actions sütunu — info və sil */}
                <td>
                  <button
                    className="btn btn-info btn-sm me-1"
                    onClick={() => navigate(`/employee/info/${emp.id}`)}
                  >
                    Info
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(emp)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update modal */}
      {showModal && (
        <UpdateModal employee={selectedEmployee} onClose={closeModal} />
      )}

      {/* Delete təsdiq modalı */}
      {deleteTarget && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title text-danger">Delete Confirmation</h5>
                <button className="btn-close" onClick={() => setDeleteTarget(null)} />
              </div>

              <div className="modal-body">
                <p>
                  Are you sure you want to delete{' '}
                  <strong>{deleteTarget.fullname}</strong>?
                </p>
                <p className="text-muted mb-0">
                  Email: {deleteTarget.email} &nbsp;|&nbsp; Position: {deleteTarget.position}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;
