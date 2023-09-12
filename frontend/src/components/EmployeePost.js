import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Add.css';

function EmployeePost({ token }) {
  // Initialize the navigation hook
  const navigate = useNavigate();

  // State for the new employee data and form errors
  const [newEmployee, setNewEmployee] = useState({
    empName: '',
    department: {
      departmentName: '',
    },
    employeeAddress: '',
    employeeSalary: '',
  });

  const [errors, setErrors] = useState({}); // State for form errors
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [departments, setDepartments] = useState([]); // State for department data

  // Define a local fetchEmployees function
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7277/api/employee/departments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Log the token here
      console.log('Token (GET):', token);
  
      // Extract department names from employee data
      const departmentNames = response.data.map((department) => department.departmentName);
       
      // Remove duplicate department names (if any)
      //const uniqueDepartmentNames = [...new Set(departmentNames)];
      //console.log('Departments:', uniqueDepartmentNames);
      setDepartments(departmentNames);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  

  // Call fetchEmployees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input changes for the form fields
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

  // Validate the form data
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

  // Handle creating a new employee
  const handleCreateEmployee = async () => {
    if (validateForm()) {
      try {
        await axios.post('https://localhost:7277/api/Employee/create', newEmployee, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Log the token here
        console.log('Token (POST):', token);

        setSuccessMessage('Employee created successfully');
        setNewEmployee({
          empName: '',
          department: {
            departmentName: '',
          },
          employeeAddress: '',
          employeeSalary: '',
        });

        // Navigate to the EmployeeList page after successful creation
        navigate('/EmployeeList');
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
          <label htmlFor="department.departmentName">Department Name</label>
        
            <select
                  className="department-select" // Add department-select class
                  name="department-select"
                  value={newEmployee.department.departmentName}
                  onChange={handleInputChange}
>

             <option value="">Select Department</option>
                 {departments.map((department, index) => (
                   <option key={index} value={department}>
                    {department}
                    </option>
                         ))}
                      </select>

          {errors.departmentName && <div className="error">{errors.departmentName}</div>}
          <br />
          <label htmlFor="employeeAddress">Employee Address</label>
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
          <label htmlFor="employeeSalary">Employee Salary</label>
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
