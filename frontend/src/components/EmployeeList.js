import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Search.css';
import EmployeePost from './EmployeePost';

function EmployeeList({token}) {
  
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

  return (
    <div className="employee-container">
    <h1 className="heading">Employee List</h1>
    <h1>employee aadd</h1>
    
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
    <div className="no-search" >
    {searchResultMessage && <p>{searchResultMessage}</p>}
   
    </div>
    <ul>
      {employees.map((employee, index) => (
        <li key={index}>
         <span className="employee-id"> </span><strong>Id:</strong> {employee.empId} <strong><br/>Name: </strong>{employee.empName}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default EmployeeList;
