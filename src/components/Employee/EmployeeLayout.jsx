import { Outlet } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader';

function EmployeeLayout() {
  return (
    <>
      <EmployeeHeader />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default EmployeeLayout;
