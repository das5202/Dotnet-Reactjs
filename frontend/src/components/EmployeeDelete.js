import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Delete.css';

function EmployeeDelete({ token }) {
  const [employeeId, setEmployeeId] = useState('');

  const handleDeleteEmployee = async () => {
    try {
      // Send a DELETE request to delete the employee
      await axios.delete(`https://localhost:7277/api/Employee/delete/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optionally, you can also refresh the employee list after deleting an employee
      // fetchEmployees();
      
      // Clear the input field after successful deletion
      setEmployeeId('');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // JavaScript (EmployeeDelete.js)
// ...

return (
  <div className="employee-delete-container">
    <h2>Delete Employee</h2>
    <div className="delete-form">
      <input
        type="text"
        className="delete-input"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button className="delete-button" onClick={handleDeleteEmployee}>
        Delete
      </button>
    </div>
  </div>
);
// ...

}

export default EmployeeDelete;