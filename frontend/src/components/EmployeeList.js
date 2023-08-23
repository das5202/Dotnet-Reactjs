import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Replace this with your actual authentication logic
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
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI4MDA4MzgsIm5iZiI6MTY5MjgwMDgzOCwiZXhwIjoxNjkyODAwODk4LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.zllF0sks2hwR_H1uZ0EOGG4sUcJx6cW6a9eSHZVvgQ4UdSATDNDlX_fh3wyPULVnEhiwJH4lQHgBf99hOyYEng`
        };
        console.log('Headers:', headers);
      
      const employeesResponse = await axios.get('https://localhost:7277/api/Employee/all', { headers });
      console.log('Employees Response:', employeesResponse);
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      console.log('Error Response:', error.response);
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {console.log('Employees:', employees)} {/* Add this line */}
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
