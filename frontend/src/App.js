import React , { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeePost from './components/EmployeePost';
import axios from 'axios';





function App() {
  const [token, setToken] = useState(null); // Store the token in the App component

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
    <div className="App">
      <EmployeeList token ={token}/> 
      <EmployeePost token={token}/>{/* Pass the token as a prop */}
       {/* Pass the token as a prop */}
    </div>
  );
}


export default App;
