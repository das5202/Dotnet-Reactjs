import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './SearchData';


  function EmployeeList() {
    const [token, setToken] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI4OTM1ODAsIm5iZiI6MTY5Mjg5MzU4MCwiZXhwIjoxNjk1NDg1NTgwLCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.NCsqWnSsxOfVT5gHxN59mRa3IpXZSfS8QcSp2dD0dH58lsMPEr8Fxpol1v8jh70SvwbzRmd9S70X3_S_bgBDLA` // Use the stored token here
      };
      
      const employeesResponse = await axios.get('https://localhost:7277/api/Employee/all', { headers });
      console.log('Employees Response:', employeesResponse);
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      console.log('Error Response:', error.response);
    }
  };

  console.log('Employees:', employees); 

return (
  <div>
      <h1>Employee List</h1>
      <SearchComponent employees={employees} setFilteredData={setFilteredData} />

      
    </div>
  );
}



export default EmployeeList;
