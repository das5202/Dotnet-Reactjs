import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Add.css';

function EmployeePost({token}) {
  const [newEmployee, setNewEmployee] = useState({
    empName: '',
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleCreateEmployee = async () => {
    try {
      // Send a POST request to create the employee
      await axios.post('https://localhost:7277/api/Employee/create', newEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
     
     // fetchEmployees();
      
      
      setNewEmployee({
        empName: '',
       
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="employee-post-container">
      <h2>Create New Employee</h2>
      <div className="post-form">
        <input
          type="text"
          className='add-input'
          placeholder="Employee Name"
          name="empName"
          value={newEmployee.empName}
          onChange={handleInputChange}
        />
       
        <button className="post-button" onClick={handleCreateEmployee}>
          Create
        </button>
      </div>
    </div>
  );
}

export default EmployeePost;
