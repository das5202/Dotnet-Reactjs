// EmployeeUpdate.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Update.css';

function EmployeeUpdate({ token }) {
  const [employeeId, setEmployeeId] = useState('');
  const [updatedEmployee, setUpdatedEmployee] = useState({
    empName: '',
    // Other employee properties...
  });

  const handleUpdateEmployee = async () => {
    try {
      // Send a PUT or PATCH request to update the employee details
      await axios.put(`https://localhost:7277/api/Employee/update/${employeeId}`, updatedEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optionally, you can also refresh the employee list after updating an employee
      // fetchEmployees();
      
      // Clear the input fields after successful update
      setEmployeeId('');
      setUpdatedEmployee({
        empName: '',
        // Other employee properties...
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // JavaScript (EmployeeUpdate.js)
// ...

return (
  <div className="employee-update-container">
    <h2 className="update-heading">Update Employee</h2>
    <div className="update-form">
     
      <input
        type="text"
        className="update-input"
        placeholder="Employee Name"
        name="empName"
        value={updatedEmployee.empName}
        onChange={(e) =>
          setUpdatedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [e.target.name]: e.target.value,
          }))
        }
      />
      {/* Other input fields for updating employee properties... */}
      
      <button className="update-button" onClick={handleUpdateEmployee}>
        Update
      </button>
    </div>
  </div>
);
// ...

}

export default EmployeeUpdate;