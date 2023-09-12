import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Search.css';
import { Link } from 'react-router-dom';

function EmployeeList({ token }) {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultMessage, setSearchResultMessage] = useState('');

  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const employeesResponse = await axios.get('https://localhost:7277/api/Employee/all', { headers });
      console.log('Employees Response:', employeesResponse);
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      console.log('Error Response:', error.response);
    }
  };

  const handleSearch = () => {
    const filteredEmployees = employees.filter(employee =>
      employee.empName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredEmployees.length === 0) {
      setSearchResultMessage('No search results found.');
    } else {
      setSearchResultMessage('');
    }

    setEmployees(filteredEmployees);
  };

  const handleEdit = (id) => {
    // Handle edit logic
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');

    if (confirmDelete) {
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const deleteResponse = await axios.delete(`https://localhost:7277/api/Employee/delete/${id}`, { headers });
        console.log('Delete Response:', deleteResponse);

        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.empId !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        console.log('Error Response:', error.response);
      }
    }
  };

  return (
    <div className="employee-container">
      <h1 className="heading">Employee Search</h1>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="no-search">
        {searchResultMessage && <p>{searchResultMessage}</p>}
      </div>
      {employees.length > 0 && (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department Name</th>
              <th>Employee Salary</th>
              <th>Employee Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.empName}</td>
                <td>{employee.department.departmentName}</td>
                <td>{employee.employeeSalary}</td>
                <td>{employee.employeeAddress}</td>
                <td>
                  <Link to={`/EmployeeUpdate/${employee.empId}`}>
                    <button className='edit-button'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(employee.empId)} className='action-button delete-button'>
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
