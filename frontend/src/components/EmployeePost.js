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

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

  const validateForm = () => {
    const errors = {};
    if (!newEmployee.empName) {
      errors.empName = 'Employee Name is required.';
    }
    if (!newEmployee.department.departmentName) {
      errors.departmentName = 'Department Name is required.';
    }
    if (!newEmployee.employeeAddress) {
      errors.employeeAddress = 'Employee Address is required.';
    }
    if (!newEmployee.employeeSalary) {
      errors.employeeSalary = 'Employee Salary is required.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateEmployee = async () => {
    if (validateForm()) {
      try {
        await axios.post('https://localhost:7277/api/Employee/create', newEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setSuccessMessage('Employee created successfully');
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
    }
  };

  return (
    <div className="employee-post-container">
      <div className="form-container">
        <div className="post-form">
          <h2>Create New Employee</h2>
          <label htmlFor="empName">Employee Name</label>
          <input
            type="text"
            className="add-input"
            placeholder="Employee Name"
            name="empName"
            value={newEmployee.empName}
            onChange={handleInputChange}
          />
          {errors.empName && <div className="error">{errors.empName}</div>}
          <br />
          <label htmlFor="departmnetName">Department Name</label>
          <input
            type="text"
            className="add-input"
            placeholder="Department Name"
            name="department.departmentName"
            value={newEmployee.department.departmentName}
            onChange={handleInputChange}
          />
          {errors.departmentName && <div className="error">{errors.departmentName}</div>}
          <br />
          <label htmlFor="empAddress">Employee Address</label>
          <input
            type="text"
            className="add-input"
            placeholder="Employee Address"
            name="employeeAddress"
            value={newEmployee.employeeAddress}
            onChange={handleInputChange}
          />
          {errors.employeeAddress && <div className="error">{errors.employeeAddress}</div>}
          <br />
          <label htmlFor="empSalary">Employee Salary</label>
          <input
            type="text"
            className="add-input"
            placeholder="Employee Salary"
            name="employeeSalary"
            value={newEmployee.employeeSalary}
            onChange={handleInputChange}
          />
          {errors.employeeSalary && <div className="error">{errors.employeeSalary}</div>}
          <br />
          <button className="post-button" onClick={handleCreateEmployee}>
            Create
          </button>
          {successMessage && <div className="success">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default EmployeePost;
