import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeePost from './components/EmployeePost';
import EmployeeUpdate from './components/EmployeePut';
import EmployeeDelete from './components/EmployeeDelete';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const authResponse = await axios.post('https://localhost:7277/api/Auth/auth', { "id": 123, "password": "a" });
        setToken(authResponse.data.accessToken);
        console.log("Authentication Response:", authResponse);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    authenticateUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EmployeeList" element={<EmployeeList token={token} />} />
          <Route path="/EmployeePost" element={<EmployeePost token={token} />} />
          <Route path="/EmployeeDelete" element={<EmployeeDelete token={token} />} />
           <Route path="/EmployeeUpdate/:employeeId" element={<EmployeeUpdate token={token} /> }/>

          {/*<Route path="/EmployeeUpdate/:empId" element={<EmployeeUpdate token={token} />} />*/}
  {/*<Route path="/EmployeeUpdate" element={<EmployeeUpdate token={token} />} />*/}
  
  {/*<Link to="/EmployeeUpdate/${employee.empId}">Update Employee</Link>*/}
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
