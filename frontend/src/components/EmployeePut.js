import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import '../styles/Update.css';

function EmployeeUpdate({ token }) {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    empName: '',
    employeeAddress: '',
    employeeSalary: '',
    departmentName: '',
  });

  useEffect(() => {
    // Fetch the employee data to pre-fill the form
    const fetchEmployee = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`https://localhost:7277/api/Employee/byId/${employeeId}`, { headers });
        const employee = response.data;
        setEmployeeData({
          empName: employee.empName,
          employeeAddress: employee.employeeAddress,
          employeeSalary: employee.employeeSalary,
          departmentName: employee.department.departmentName,
        });
      } catch (error) {
        console.error('Error fetching employee:', error);
        console.log('Error Response:', error.response);
      }
    };

    fetchEmployee();
  }, [employeeId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const updateData = {
        empName: employeeData.empName,
        employeeAddress: employeeData.employeeAddress,
        employeeSalary: parseFloat(employeeData.employeeSalary), // Parse salary to a number
        department: {
          departmentName: employeeData.departmentName,
        },
      };

      const updateResponse = await axios.put(`https://localhost:7277/api/Employee/update/${employeeId}`, updateData, {
        headers,
      });
      console.log('Update Response:', updateResponse);

      // Redirect to the employee list page after updating
      navigate('/EmployeeList');
    } catch (error) {
      console.error('Error updating employee:', error);
      console.log('Error Response:', error.response);
    }
  };

  return (
    <div className="employee-post-container">
     
      <div className="post-form">
      <h1 className="add-heading ">Update Employee</h1>
        <div className="form-group">
          <label htmlFor="empName">Employee Name</label>
          <input
            type="text"
            id="empName"
            name="empName"
            value={employeeData.empName}
            onChange={handleInputChange}
            className="add-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeAddress">Employee Address</label>
          <input
            type="text"
            id="employeeAddress"
            name="employeeAddress"
            value={employeeData.employeeAddress}
            onChange={handleInputChange}
            className="add-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeSalary">Employee Salary</label>
          <input
            type="number"
            id="employeeSalary"
            name="employeeSalary"
            value={employeeData.employeeSalary}
            onChange={handleInputChange}
            className="add-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="departmentName">Department Name</label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={employeeData.departmentName}
            onChange={handleInputChange}
            className="add-input"
          />
        </div>
        <button className="post-button" onClick={handleUpdate}>Update Employee</button>
      </div>
    </div>
  );
}
export default EmployeeUpdate;