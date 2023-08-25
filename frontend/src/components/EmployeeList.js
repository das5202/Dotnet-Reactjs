import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [token, setToken] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const authResponse = await axios.post('https://localhost:7277/api/Auth/auth', { "id":123, "password":"a"});
        setToken(authResponse.data.accessToken);
        console.log("Authentication Response:", authResponse);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    authenticateUser();
  }, []);

  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI5NzU2ODYsIm5iZiI6MTY5Mjk3NTY4NiwiZXhwIjoxNjk1NTY3Njg2LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.D4yywoUgrHLZzUtsTsk4dEWoNOimQhVFtn5vusJrBE-izmt_y0jjd0ffne7PvZ1-ify9kWVuyOEMxmMa_EuOyw` // Use the stored token here
      };
      
      const employeesResponse = await axios.get('https://localhost:7277/api/Employee/all', { headers });
      console.log('Employees Response:', employeesResponse);
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      console.log('Error Response:', error.response);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.empName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul>
        {filteredEmployees.map((employee, index) => (
          <li key={index}>
            {employee.empId}<br />
            {employee.empName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
