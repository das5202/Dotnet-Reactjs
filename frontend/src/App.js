import React , { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeePost from './components/EmployeePost';
import axios from 'axios';





function App() {
  

  return (
    <div className="App">
      <EmployeeList token /> {/* Pass the token as a prop */}
       {/* Pass the token as a prop */}
    </div>
  );
}


export default App;
