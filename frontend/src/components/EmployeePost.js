import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Add.css';

function EmployeePost({ token }) {
  const [newEmployee, setNewEmployee] = useState({
    empName: '',
    department: {
      departmentName: '',
    },
    employeeAddress: '',
    employeeSalary: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('department.')) {
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        department: {
          ...prevEmployee.department,
          [name.replace('department.', '')]: value,
        },
      }));
    } else {
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  const handleCreateEmployee = async () => {
    try {
      await axios.post('https://localhost:7277/api/Employee/create', newEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setNewEmployee({
        empName: '',
        department: {
          departmentName: '',
        },
        employeeAddress: '',
        employeeSalary: '',
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="employee-post-container">
      
      <div className="form-container">
      
        <div className="post-form">
        <h2>Create New Employee</h2>
          <input
            type="text"
            className="add-input"
            placeholder="Employee Name"
            name="empName"
            value={newEmployee.empName}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            className="add-input"
            placeholder="Department Name"
            name="department.departmentName"
            value={newEmployee.department.departmentName}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            className="add-input"
            placeholder="Employee Address"
            name="employeeAddress"
            value={newEmployee.employeeAddress}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            className="add-input"
            placeholder="Employee Salary"
            name="employeeSalary"
            value={newEmployee.employeeSalary}
            onChange={handleInputChange}
          />
          <br />
          <button className="post-button" onClick={handleCreateEmployee}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeePost;
