import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Home() {
  return (
    <div className='Home'>
      <div className='content-container'>
        <h1>Welcome to the Home Page</h1>
        <div className='button-container'>
          <Link to='/EmployeePost'>
            <button className='action-button'>
              <i className='fas fa-plus'></i>
            </button>
          </Link>
          <Link to='/EmployeeList'>
            <button className='action-button'>
              <i className='fas fa-search'></i>
            </button>
          </Link>
          <Link to='/EmployeeDelete'>
            <button className='action-button'>
              <i className='fas fa-trash'></i>
            </button>
          </Link>
          <Link to='/EmployeeUpdate'>
            <button className='action-button'>
              <i className='fas fa-edit'></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
